import { NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";

// GET — return habits for a user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const habits = readData("habits").filter((h) => h.userId === userId);

    return NextResponse.json(habits);
  } catch (error) {
    console.error("Failed to load habits:", error);
    return NextResponse.json(
      { error: "Failed to load habits" },
      { status: 500 }
    );
  }
}

// POST — create a new habit
export async function POST(request) {
  try {
    const {
      userId,
      name,
      identityStatement,
      implementationIntention,
      stackedOn,
      time,
      location,
    } = await request.json();

    if (!userId || !name) {
      return NextResponse.json(
        { error: "userId and name are required" },
        { status: 400 }
      );
    }

    const habits = readData("habits");

    const newHabit = {
      id: generateId(),
      userId,
      name: name.trim(),
      identityStatement: identityStatement || "",
      implementationIntention: implementationIntention || "",
      stackedOn: stackedOn || null,
      time: time || "",
      location: location || "",
      currentDay: 0,
      totalDays: 66,
      graduated: false,
    };

    habits.push(newHabit);
    writeData("habits", habits);

    return NextResponse.json(newHabit, { status: 201 });
  } catch (error) {
    console.error("Failed to create habit:", error);
    return NextResponse.json(
      { error: "Failed to create habit" },
      { status: 500 }
    );
  }
}
