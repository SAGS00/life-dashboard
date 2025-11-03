export type Habit = {
  id: string;
  name: string;
  icon: string;
  color: string;
  completedDates: string[]; // ISO date strings
  createdAt: string;
};

export type JournalEntry = {
  id: string;
  date: string;
  content: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  tags: string[];
  createdAt: string;
};

export type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
};

export type HealthLog = {
  id: string;
  date: string;
  steps: number;
  sleep: number; // hours
  water: number; // glasses
  calories: number;
};

export type Goal = {
  id: string;
  title: string;
  description: string;
  category: 'short' | 'long';
  progress: number; // 0-100
  milestones: Milestone[];
  targetDate: string;
  createdAt: string;
};

export type Milestone = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
};

export type PomodoroSession = {
  id: string;
  duration: number; // minutes
  completed: boolean;
  startTime: string;
  endTime?: string;
};

export type DashboardSettings = {
  theme: 'light' | 'dark';
  accentColor: string;
  enabledModules: string[];
  dailyReminders: boolean;
  firstName: string;
};
