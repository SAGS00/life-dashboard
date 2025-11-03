export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

export function getToday(): string {
  return formatDate(new Date());
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export function getDayName(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { weekday: 'long' });
}

export function getMonthName(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'long' });
}

export function getLast7Days(): string[] {
  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
}

export function getLast30Days(): string[] {
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
}

export function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  
  const sortedDates = [...completedDates].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  const today = getToday();
  const yesterday = formatDate(new Date(Date.now() - 86400000));
  
  // Check if today or yesterday is in the array
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }
  
  let streak = 0;
  let currentDate = new Date();
  
  for (const dateStr of sortedDates) {
    const checkDate = formatDate(currentDate);
    if (dateStr === checkDate) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}
