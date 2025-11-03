export const APP_CONFIG = {
  name: 'Life Dashboard',
  description: 'Track your habits, tasks, health, finances, and goals in one place',
  defaultTheme: 'light' as const,
  defaultFirstName: 'Friend',
} as const;

export const DEFAULT_ENABLED_MODULES = [
  'habits',
  'journal',
  'finance',
  'health',
  'goals',
  'tasks',
  'pomodoro',
] as const;

export const MOOD_OPTIONS = [
  { value: 'great', label: '😄 Great', emoji: '😄' },
  { value: 'good', label: '🙂 Good', emoji: '🙂' },
  { value: 'okay', label: '😐 Okay', emoji: '😐' },
  { value: 'bad', label: '😞 Bad', emoji: '😞' },
  { value: 'terrible', label: '😢 Terrible', emoji: '😢' },
] as const;
