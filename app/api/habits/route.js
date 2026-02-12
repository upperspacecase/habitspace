import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "habits.json");

function readHabits() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeHabits(habits) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(habits, null, 2));
}

// GET — return all habits (client will handle random selection + seen tracking)
export async function GET() {
  try {
    const habits = readHabits();
    return NextResponse.json(habits);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load habits" }, { status: 500 });
  }
}

// POST — add a new habit
export async function POST(request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Habit text is required" }, { status: 400 });
    }

    if (text.trim().length > 200) {
      return NextResponse.json({ error: "Keep it short — 200 characters max" }, { status: 400 });
    }

    const habits = readHabits();
    const newHabit = {
      id: `h${String(habits.length + 1).padStart(3, "0")}`,
      text: text.trim(),
      author: "Anonymous",
      votes: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    habits.push(newHabit);
    writeHabits(habits);

    return NextResponse.json(newHabit, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save habit" }, { status: 500 });
  }
}
