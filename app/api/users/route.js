import { NextResponse } from "next/server";
import {
  readUsers,
  writeUsers,
  getUserByEmail,
  getTodayString,
} from "@/lib/data";
import { getTemplate, buildCustomLevels } from "@/lib/templates";
import { sendWelcomeEmail } from "@/lib/resend";

// GET — look up user by email query param
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

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

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// POST — create a new user and start their first habit
export async function POST(request) {
  try {
    const { email, templateId, customHabitName, reminderTime } =
      await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!templateId && !customHabitName) {
      return NextResponse.json(
        { error: "Pick a habit template or enter a custom habit" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "already_exists", user: existing },
        { status: 409 }
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
      habitName = customHabitName.trim();
      emoji = "\u{1F3AF}";
      levels = buildCustomLevels(habitName);
    }

    const users = readUsers();
    const newUser = {
      id: `u${String(users.length + 1).padStart(4, "0")}`,
      email: email.toLowerCase().trim(),
      reminderTime: reminderTime || "08:00",
      activeHabit: {
        templateId: templateId || "custom",
        name: habitName,
        emoji,
        currentLevel: 1,
        levels,
        startedAt: getTodayString(),
        completionsAtLevel: 0,
      },
      graduatedHabits: [],
      createdAt: getTodayString(),
    };

    users.push(newUser);
    writeUsers(users);

    // Send welcome email (non-blocking)
    sendWelcomeEmail(email, habitName, levels[0].task).catch(console.error);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
