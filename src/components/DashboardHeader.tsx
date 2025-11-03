import { getGreeting, getDayName, getMonthName } from '../utils/dates';
import { Sun, Moon, Settings } from 'lucide-react';
import { Button } from './ui/button';

type DashboardHeaderProps = {
  firstName: string;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onSettingsClick: () => void;
};

export function DashboardHeader({ firstName, theme, onThemeToggle, onSettingsClick }: DashboardHeaderProps) {
  const today = new Date();
  const greeting = getGreeting();
  const dayName = getDayName(today);
  const monthName = getMonthName(today);
  const date = today.getDate();

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-4xl mb-2">
          {greeting}, {firstName}!
        </h1>
        <p className="text-muted-foreground">
          {dayName}, {monthName} {date}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" onClick={onThemeToggle}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        <Button variant="outline" size="icon" onClick={onSettingsClick}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
