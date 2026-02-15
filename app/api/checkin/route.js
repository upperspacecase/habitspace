import { NextResponse } from "next/server";
import {
  readUsers,
  writeUsers,
  readCheckins,
  writeCheckins,
  getUserByEmail,
  hasCheckedInToday,
  getCheckinsForUserAtLevel,
  getTodayString,
  calculateStreak,
} from "@/lib/data";
import { sendLevelUpEmail, sendGraduationEmail } from "@/lib/resend";

// POST — record a daily check-in
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.activeHabit) {
      return NextResponse.json(
        { error: "No active habit. Pick a new one!" },
        { status: 400 }
      );
    }

    // Check if already checked in today
    if (hasCheckedInToday(email)) {
      return NextResponse.json(
        {
          error: "already_checked_in",
          message: "You already checked in today. See you tomorrow!",
        },
        { status: 409 }
      );
    }

    const today = getTodayString();
    const currentLevel = user.activeHabit.currentLevel;
    const currentLevelData = user.activeHabit.levels[currentLevel - 1];

    // Record the check-in
    const checkins = readCheckins();
    checkins.push({
      email: email.toLowerCase().trim(),
      date: today,
      habitName: user.activeHabit.name,
      level: currentLevel,
      task: currentLevelData.task,
    });
    writeCheckins(checkins);

    // Update user data
    const users = readUsers();
    const userIndex = users.findIndex(
      (u) => u.email === email.toLowerCase().trim()
    );
    const updatedUser = users[userIndex];

    updatedUser.activeHabit.completionsAtLevel += 1;

    // Calculate streak
    const streak = calculateStreak(email);

    // Check for events
    const events = [];
    const completionsNeeded = currentLevelData.daysRequired;
    const totalLevels = updatedUser.activeHabit.levels.length;

    if (updatedUser.activeHabit.completionsAtLevel >= completionsNeeded) {
      if (currentLevel >= totalLevels) {
        // GRADUATION
        const totalCheckins = getCheckinsForUserAtLevel(
          email,
          updatedUser.activeHabit.name,
          currentLevel
        );
        const allCheckins = checkins.filter(
          (c) =>
            c.email === email.toLowerCase().trim() &&
            c.habitName === updatedUser.activeHabit.name
        );

        updatedUser.graduatedHabits.push({
          name: updatedUser.activeHabit.name,
          emoji: updatedUser.activeHabit.emoji,
          completedAt: today,
          totalDays: allCheckins.length,
          finalLevel: currentLevelData.task,
        });

        events.push({
          type: "graduated",
          habitName: updatedUser.activeHabit.name,
          totalDays: allCheckins.length,
        });

        // Send graduation email
        sendGraduationEmail(
          email,
          updatedUser.activeHabit.name,
          allCheckins.length
        ).catch(console.error);

        updatedUser.activeHabit = null;
      } else {
        // LEVEL UP
        const newLevel = currentLevel + 1;
        const newLevelData = updatedUser.activeHabit.levels[newLevel - 1];

        updatedUser.activeHabit.currentLevel = newLevel;
        updatedUser.activeHabit.completionsAtLevel = 0;

        events.push({
          type: "level_up",
          newLevel,
          newTask: newLevelData.task,
        });

        // Send level-up email
        sendLevelUpEmail(
          email,
          updatedUser.activeHabit.name,
          newLevel,
          newLevelData.task
        ).catch(console.error);
      }
    }

    writeUsers(users);

    return NextResponse.json({
      user: updatedUser,
      streak,
      events,
      checkedIn: true,
    });
  } catch (error) {
    console.error("Check-in failed:", error);
    return NextResponse.json(
      { error: "Failed to record check-in" },
      { status: 500 }
    );
  }
}
