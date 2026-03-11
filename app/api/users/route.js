import { NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";

// GET — find user by email, return with their habits
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const users = readData("users");
    const user = users.find(
      (u) => u.email === email.toLowerCase().trim()
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const habits = readData("habits").filter((h) => h.userId === user.id);

    return NextResponse.json({ ...user, habits });
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// POST — create a new user
export async function POST(request) {
  try {
    const { email, name } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const users = readData("users");

    // Check for existing user
    const existing = users.find(
      (u) => u.email === email.toLowerCase().trim()
    );
    if (existing) {
      return NextResponse.json(
        { error: "already_exists", user: existing },
        { status: 409 }
      );
    }

    const newUser = {
      id: generateId(),
      email: email.toLowerCase().trim(),
      name: name.trim(),
      identityStatements: [],
      memberSince: new Date().toISOString().split("T")[0],
    };

    users.push(newUser);
    writeData("users", users);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
