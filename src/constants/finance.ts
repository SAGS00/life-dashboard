export const EXPENSE_CATEGORIES = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Health & Fitness",
    "Education",
    "Other",
] as const;

export const CHART_COLORS = [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // amber
    "#8b5cf6", // violet
    "#ec4899", // pink
    "#06b6d4", // cyan
    "#84cc16", // lime
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
