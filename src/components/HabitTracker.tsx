import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Check, Flame, Trash2 } from 'lucide-react';
import { Habit } from '../types';
import { getToday, calculateStreak } from '../utils/dates';
import { motion } from 'motion/react';

type HabitTrackerProps = {
  habits: Habit[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => void;
  onToggleHabit: (habitId: string, date: string) => void;
  onDeleteHabit: (habitId: string) => void;
};

const habitIcons = ['💪', '📚', '🏃', '🧘', '💧', '🎯', '✍️', '🎨', '🎵', '🌱'];
const habitColors = ['blue', 'green', 'purple', 'orange', 'pink', 'red', 'indigo', 'teal'];

export function HabitTracker({ habits, onAddHabit, onToggleHabit, onDeleteHabit }: HabitTrackerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', icon: '💪', color: 'blue' });
  const today = getToday();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.name.trim()) {
      onAddHabit(newHabit);
      setNewHabit({ name: '', icon: '💪', color: 'blue' });
      setIsOpen(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Daily Habits</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Habit</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="habit-name">Habit Name</Label>
                <Input
                  id="habit-name"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  placeholder="e.g., Morning Exercise"
                />
              </div>
              <div>
                <Label>Icon</Label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {habitIcons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewHabit({ ...newHabit, icon })}
                      className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xl transition-all ${
                        newHabit.icon === icon ? 'border-primary scale-110' : 'border-gray-200'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Color</Label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {habitColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewHabit({ ...newHabit, color })}
                      className={`w-10 h-10 rounded-lg border-2 transition-all ${
                        newHabit.color === color ? 'border-primary scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: `var(--${color}-500, ${color})` }}
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full">Create Habit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {habits.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No habits yet. Create your first habit to get started!
          </p>
        ) : (
          habits.map((habit) => {
            const isCompletedToday = habit.completedDates.includes(today);
            const streak = calculateStreak(habit.completedDates);

            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCompletedToday ? 'bg-green-50 dark:bg-green-950 border-green-300' : 'bg-gray-50 dark:bg-gray-900 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{habit.icon}</span>
                    <div className="flex-1">
                      <h3>{habit.name}</h3>
                      {streak > 0 && (
                        <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-sm mt-1">
                          <Flame className="h-4 w-4" />
                          <span>{streak} day streak</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={isCompletedToday ? 'default' : 'outline'}
                      onClick={() => onToggleHabit(habit.id, today)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteHabit(habit.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </Card>
  );
}
