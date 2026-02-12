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

// POST — upvote a habit
export async function POST(request, { params }) {
    try {
        const { id } = await params;
        const habits = readHabits();
        const habit = habits.find((h) => h.id === id);

        if (!habit) {
            return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }

        habit.votes += 1;
        writeHabits(habits);

        return NextResponse.json(habit);
    } catch (error) {
        return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
    }
}
