export const HABIT_ICONS = [
    "💪",
    "📚",
    "🏃",
    "🧘",
    "💧",
    "🎯",
    "✍️",
    "🎨",
    "🎵",
    "🌱",
] as const;

export const HABIT_COLORS = [
    "blue",
    "green",
    "purple",
    "orange",
    "pink",
    "red",
    "indigo",
    "teal",
] as const;

export type HabitIcon = (typeof HABIT_ICONS)[number];
export type HabitColor = (typeof HABIT_COLORS)[number];
