import fs from "fs";
import path from "path";

const USERS_PATH = path.join(process.cwd(), "data", "users.json");
const CHECKINS_PATH = path.join(process.cwd(), "data", "checkins.json");

function readJSON(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function readUsers() {
  return readJSON(USERS_PATH);
}

export function writeUsers(users) {
  writeJSON(USERS_PATH, users);
}

export function readCheckins() {
  return readJSON(CHECKINS_PATH);
}

export function writeCheckins(checkins) {
  writeJSON(CHECKINS_PATH, checkins);
}

export function getUserByEmail(email) {
  const users = readUsers();
  return users.find((u) => u.email === email.toLowerCase().trim());
}

export function getCheckinsForUser(email) {
  const checkins = readCheckins();
  return checkins.filter((c) => c.email === email.toLowerCase().trim());
}

export function getCheckinsForUserAtLevel(email, habitName, level) {
  const checkins = readCheckins();
  return checkins.filter(
    (c) =>
      c.email === email.toLowerCase().trim() &&
      c.habitName === habitName &&
      c.level === level
  );
}

export function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

export function hasCheckedInToday(email) {
  const today = getTodayString();
  const checkins = readCheckins();
  return checkins.some(
    (c) => c.email === email.toLowerCase().trim() && c.date === today
  );
}

export function calculateStreak(email) {
  const checkins = getCheckinsForUser(email);
  if (checkins.length === 0) return 0;

  const dates = [...new Set(checkins.map((c) => c.date))].sort().reverse();
  const today = getTodayString();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // Streak must include today or yesterday to be active
  if (dates[0] !== today && dates[0] !== yesterday) return 0;

  let streak = 0;
  let expectedDate = new Date(dates[0]);

  for (const dateStr of dates) {
    const date = new Date(dateStr + "T00:00:00");
    const expected = new Date(expectedDate);

    if (date.getTime() === expected.getTime()) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
