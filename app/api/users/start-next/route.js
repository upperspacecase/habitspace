import { NextResponse } from "next/server";
import { readUsers, writeUsers, getUserByEmail, getTodayString } from "@/lib/data";
import { getTemplate, buildCustomLevels } from "@/lib/templates";
import { sendWelcomeEmail } from "@/lib/resend";

// POST — start the next habit after graduating
export async function POST(request) {
  try {
    const { email, templateId, customHabitName } = await request.json();

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

    if (user.activeHabit) {
      return NextResponse.json(
        { error: "You already have an active habit. Finish it first!" },
        { status: 400 }
      );
    }

    // Build the habit data
    let habitName, emoji, levels;
    if (templateId && templateId !== "custom") {
      const template = getTemplate(templateId);
      if (!template) {
        return NextResponse.json(
          { error: "Invalid template" },
          { status: 400 }
        );
      }
      habitName = template.name;
      emoji = template.emoji;
      levels = template.levels;
    } else {
      if (!customHabitName) {
        return NextResponse.json(
          { error: "Custom habit name is required" },
          { status: 400 }
        );
      }
      habitName = customHabitName.trim();
      emoji = "\u{1F3AF}";
      levels = buildCustomLevels(habitName);
    }

    // Update user
    const users = readUsers();
    const userIndex = users.findIndex(
      (u) => u.email === email.toLowerCase().trim()
    );
    users[userIndex].activeHabit = {
      templateId: templateId || "custom",
      name: habitName,
      emoji,
      currentLevel: 1,
      levels,
      startedAt: getTodayString(),
      completionsAtLevel: 0,
    };
    writeUsers(users);

    // Send welcome email for the new habit
    sendWelcomeEmail(email, habitName, levels[0].task).catch(console.error);

    return NextResponse.json(users[userIndex]);
  } catch (error) {
    console.error("Failed to start next habit:", error);
    return NextResponse.json(
      { error: "Failed to start habit" },
      { status: 500 }
    );
  }
}
