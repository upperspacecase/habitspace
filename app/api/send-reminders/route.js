import { NextResponse } from "next/server";
import { readUsers, calculateStreak } from "@/lib/data";
import { sendReminderEmail } from "@/lib/resend";

// POST — send daily reminders to users
// Designed to be called by a cron job (e.g., every hour)
// Optionally filter by reminder hour to only send at the right time
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { hour, apiKey } = body;

    // Simple API key protection for cron endpoint
    if (
      process.env.CRON_API_KEY &&
      apiKey !== process.env.CRON_API_KEY
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = readUsers();
    const results = [];

    for (const user of users) {
      // Skip users with no active habit
      if (!user.activeHabit) continue;

      // If hour filter provided, only send to users whose reminder time matches
      if (hour !== undefined) {
        const userHour = parseInt(user.reminderTime.split(":")[0], 10);
        if (userHour !== hour) continue;
      }

      const currentLevel = user.activeHabit.currentLevel;
      const currentTask = user.activeHabit.levels[currentLevel - 1].task;
      const streak = calculateStreak(user.email);

      const result = await sendReminderEmail(
        user.email,
        user.activeHabit.name,
        currentTask,
        streak,
        currentLevel
      );

      results.push({
        email: user.email,
        ...result,
      });
    }

    return NextResponse.json({
      sent: results.length,
      results,
    });
  } catch (error) {
    console.error("Send reminders failed:", error);
    return NextResponse.json(
      { error: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
