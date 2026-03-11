import { NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";

// POST — record a daily check-in
export async function POST(request) {
  try {
    const { habitId } = await request.json();

    if (!habitId) {
      return NextResponse.json(
        { error: "habitId is required" },
        { status: 400 }
      );
    }

    const habits = readData("habits");
    const habitIndex = habits.findIndex((h) => h.id === habitId);

    if (habitIndex === -1) {
      return NextResponse.json(
        { error: "Habit not found" },
        { status: 404 }
      );
    }

    const habit = habits[habitIndex];
    const today = new Date().toISOString().split("T")[0];

    // Check for duplicate check-in on same date
    const checkins = readData("checkins");
    const alreadyCheckedIn = checkins.some(
      (c) => c.habitId === habitId && c.date === today
    );

    if (alreadyCheckedIn) {
      return NextResponse.json(
        { error: "Already checked in today for this habit" },
        { status: 409 }
      );
    }

    // Create check-in
    const newCheckin = {
      id: generateId(),
      habitId,
      date: today,
      completedAt: new Date().toISOString(),
    };

    checkins.push(newCheckin);
    writeData("checkins", checkins);

    // Increment currentDay
    habit.currentDay += 1;

    // Check for graduation
    let graduated = false;
    if (habit.currentDay >= habit.totalDays) {
      habit.graduated = true;
      graduated = true;
    }

    habits[habitIndex] = habit;
    writeData("habits", habits);

    return NextResponse.json({
      checkin: newCheckin,
      habit,
      graduated,
    });
  } catch (error) {
    console.error("Check-in failed:", error);
    return NextResponse.json(
      { error: "Failed to record check-in" },
      { status: 500 }
    );
  }
}
