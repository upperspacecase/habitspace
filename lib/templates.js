export const habitTemplates = [
  {
    id: "meditate",
    name: "Meditate",
    emoji: "\u{1F9D8}",
    description: "Build a daily meditation practice, starting from just 60 seconds",
    levels: [
      { level: 1, task: "Sit quietly for 60 seconds", daysRequired: 7 },
      { level: 2, task: "Focus on your breath for 2 minutes", daysRequired: 7 },
      { level: 3, task: "Guided meditation for 5 minutes", daysRequired: 7 },
      { level: 4, task: "Meditate for 10 minutes", daysRequired: 7 },
      { level: 5, task: "Meditate for 20 minutes", daysRequired: 7 },
    ],
  },
  {
    id: "read",
    name: "Read",
    emoji: "\u{1F4D6}",
    description: "Develop a reading habit, one page at a time",
    levels: [
      { level: 1, task: "Read just 1 page of any book", daysRequired: 7 },
      { level: 2, task: "Read for 5 minutes", daysRequired: 7 },
      { level: 3, task: "Read for 10 minutes", daysRequired: 7 },
      { level: 4, task: "Read for 15 minutes", daysRequired: 7 },
      { level: 5, task: "Read for 20 minutes", daysRequired: 7 },
    ],
  },
  {
    id: "exercise",
    name: "Exercise",
    emoji: "\u{1F4AA}",
    description: "Get moving every day, starting ridiculously small",
    levels: [
      { level: 1, task: "Do 5 pushups or stretch for 2 minutes", daysRequired: 7 },
      { level: 2, task: "Take a 10-minute walk", daysRequired: 7 },
      { level: 3, task: "15-minute workout of any kind", daysRequired: 7 },
      { level: 4, task: "20-minute focused workout", daysRequired: 7 },
      { level: 5, task: "30-minute workout session", daysRequired: 7 },
    ],
  },
  {
    id: "journal",
    name: "Journal",
    emoji: "\u{270D}\u{FE0F}",
    description: "Start writing about your life, one sentence at a time",
    levels: [
      { level: 1, task: "Write 1 sentence about your day", daysRequired: 7 },
      { level: 2, task: "Write 3 sentences about your day", daysRequired: 7 },
      { level: 3, task: "Write a full paragraph", daysRequired: 7 },
      { level: 4, task: "Free-write for 5 minutes", daysRequired: 7 },
      { level: 5, task: "Journal for 10 minutes", daysRequired: 7 },
    ],
  },
  {
    id: "hydrate",
    name: "Hydrate",
    emoji: "\u{1F4A7}",
    description: "Drink more water, building up glass by glass",
    levels: [
      { level: 1, task: "Drink 1 glass of water in the morning", daysRequired: 7 },
      { level: 2, task: "Drink 3 glasses throughout the day", daysRequired: 7 },
      { level: 3, task: "Drink 5 glasses throughout the day", daysRequired: 7 },
      { level: 4, task: "Drink 7 glasses throughout the day", daysRequired: 7 },
      { level: 5, task: "Drink 8 glasses throughout the day", daysRequired: 7 },
    ],
  },
  {
    id: "gratitude",
    name: "Gratitude",
    emoji: "\u{1F64F}",
    description: "Cultivate thankfulness as a daily practice",
    levels: [
      { level: 1, task: "Think of 1 thing you're grateful for", daysRequired: 7 },
      { level: 2, task: "Write down 1 thing you're grateful for", daysRequired: 7 },
      { level: 3, task: "Write down 3 things you're grateful for", daysRequired: 7 },
      { level: 4, task: "Write a short thank-you note to someone", daysRequired: 7 },
      { level: 5, task: "Gratitude journal for 5 minutes", daysRequired: 7 },
    ],
  },
  {
    id: "sleep",
    name: "Better Sleep",
    emoji: "\u{1F319}",
    description: "Improve your sleep one small change at a time",
    levels: [
      { level: 1, task: "Set a consistent bedtime alarm", daysRequired: 7 },
      { level: 2, task: "No screens 15 minutes before bed", daysRequired: 7 },
      { level: 3, task: "No screens 30 minutes before bed", daysRequired: 7 },
      { level: 4, task: "Create a 10-minute wind-down routine", daysRequired: 7 },
      { level: 5, task: "Full sleep hygiene routine nightly", daysRequired: 7 },
    ],
  },
  {
    id: "declutter",
    name: "Declutter",
    emoji: "\u{2728}",
    description: "Create order in your space, one surface at a time",
    levels: [
      { level: 1, task: "Tidy one small surface", daysRequired: 7 },
      { level: 2, task: "Organize one drawer or shelf", daysRequired: 7 },
      { level: 3, task: "Clean one area for 10 minutes", daysRequired: 7 },
      { level: 4, task: "Declutter 5 items you don't need", daysRequired: 7 },
      { level: 5, task: "15-minute daily tidy routine", daysRequired: 7 },
    ],
  },
];

export function getTemplate(id) {
  return habitTemplates.find((t) => t.id === id);
}

export function buildCustomLevels(habitName) {
  return [
    { level: 1, task: `${habitName} — smallest possible version`, daysRequired: 7 },
    { level: 2, task: `${habitName} — slightly more effort`, daysRequired: 7 },
    { level: 3, task: `${habitName} — moderate effort`, daysRequired: 7 },
    { level: 4, task: `${habitName} — solid effort`, daysRequired: 7 },
    { level: 5, task: `${habitName} — full target version`, daysRequired: 7 },
  ];
}
