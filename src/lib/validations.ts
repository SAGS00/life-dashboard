import { z } from 'zod';

// Habit Validation Schema
export const habitSchema = z.object({
  name: z.string().min(1, 'Habit name is required').max(50, 'Name is too long'),
  icon: z.string().min(1, 'Please select an icon'),
  color: z.string().min(1, 'Please select a color'),
});

// Journal Entry Validation Schema
export const journalEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  content: z.string().min(1, 'Content is required').max(5000, 'Content is too long'),
  mood: z.enum(['great', 'good', 'okay', 'bad', 'terrible']),
  tags: z.array(z.string()).default([]),
});

// Expense Validation Schema
export const expenseSchema = z.object({
  amount: z.number().positive('Amount must be positive').max(1000000, 'Amount is too large'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().max(200, 'Description is too long'),
  date: z.string().min(1, 'Date is required'),
  type: z.enum(['income', 'expense']),
});

// Health Log Validation Schema
export const healthLogSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  steps: z.number().min(0, 'Steps cannot be negative').max(100000, 'Steps value is too high'),
  sleep: z.number().min(0, 'Sleep cannot be negative').max(24, 'Sleep hours cannot exceed 24'),
  water: z.number().min(0, 'Water cannot be negative').max(30, 'Water glasses seems too high'),
  calories: z.number().min(0, 'Calories cannot be negative').max(10000, 'Calories value is too high'),
});

// Goal Validation Schema
export const goalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long'),
  category: z.enum(['short', 'long']),
  progress: z.number().min(0).max(100),
  targetDate: z.string().min(1, 'Target date is required'),
  milestones: z.array(z.object({
    id: z.string(),
    title: z.string().min(1, 'Milestone title is required'),
    completed: z.boolean(),
  })).default([]),
});

// Task Validation Schema
export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long'),
  status: z.enum(['todo', 'inprogress', 'done']).default('todo'),
  priority: z.enum(['low', 'medium', 'high']),
});

// Settings Validation Schema
export const settingsSchema = z.object({
  theme: z.enum(['light', 'dark']),
  accentColor: z.string(),
  enabledModules: z.array(z.string()),
  dailyReminders: z.boolean(),
  firstName: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
});

// Export Data Validation Schema
export const exportDataSchema = z.object({
  habits: z.array(z.any()).optional(),
  journalEntries: z.array(z.any()).optional(),
  expenses: z.array(z.any()).optional(),
  healthLogs: z.array(z.any()).optional(),
  goals: z.array(z.any()).optional(),
  tasks: z.array(z.any()).optional(),
  settings: z.any().optional(),
  exportedAt: z.string(),
});
