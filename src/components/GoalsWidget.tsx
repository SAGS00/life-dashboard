import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Target, Plus, CheckSquare, Square } from 'lucide-react';
import { Goal, Milestone } from '../types';
import { motion } from 'motion/react';

type GoalsWidgetProps = {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  onUpdateProgress: (goalId: string, progress: number) => void;
  onToggleMilestone: (goalId: string, milestoneId: string) => void;
};

export function GoalsWidget({ goals, onAddGoal, onUpdateProgress, onToggleMilestone }: GoalsWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'short' as const,
    targetDate: '',
    milestones: [] as Milestone[],
  });
  const [milestoneInput, setMilestoneInput] = useState('');

  const handleAddMilestone = () => {
    if (milestoneInput.trim()) {
      setNewGoal({
        ...newGoal,
        milestones: [
          ...newGoal.milestones,
          {
            id: Date.now().toString(),
            title: milestoneInput,
            completed: false,
          },
        ],
      });
      setMilestoneInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.title.trim()) {
      onAddGoal({
        ...newGoal,
        progress: 0,
      });
      setNewGoal({
        title: '',
        description: '',
        category: 'short',
        targetDate: '',
        milestones: [],
      });
      setIsOpen(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          <h2 className="text-xl">Goals</h2>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input
                  id="goal-title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Learn React"
                />
              </div>
              <div>
                <Label htmlFor="goal-description">Description</Label>
                <Textarea
                  id="goal-description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="What do you want to achieve?"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal-category">Timeline</Label>
                  <select
                    id="goal-category"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as 'short' | 'long' })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="short">Short-term</option>
                    <option value="long">Long-term</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="goal-date">Target Date</Label>
                  <Input
                    id="goal-date"
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Milestones</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={milestoneInput}
                    onChange={(e) => setMilestoneInput(e.target.value)}
                    placeholder="Add a milestone..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMilestone())}
                  />
                  <Button type="button" onClick={handleAddMilestone}>Add</Button>
                </div>
                {newGoal.milestones.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {newGoal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-900 rounded">
                        <CheckSquare className="h-4 w-4" />
                        {milestone.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full">Create Goal</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No goals yet. Set your first goal to get started!
          </p>
        ) : (
          goals.map((goal) => {
            const completedMilestones = goal.milestones.filter(m => m.completed).length;
            const totalMilestones = goal.milestones.length;
            const milestoneProgress = totalMilestones > 0 
              ? (completedMilestones / totalMilestones) * 100 
              : goal.progress;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3>{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    goal.category === 'short' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                  }`}>
                    {goal.category === 'short' ? 'Short-term' : 'Long-term'}
                  </span>
                </div>

                {goal.targetDate && (
                  <p className="text-xs text-muted-foreground mb-2">
                    Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </p>
                )}

                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{Math.round(milestoneProgress)}%</span>
                  </div>
                  <Progress value={milestoneProgress} />
                </div>

                {goal.milestones.length > 0 && (
                  <div className="space-y-1">
                    {goal.milestones.map((milestone) => (
                      <button
                        key={milestone.id}
                        onClick={() => onToggleMilestone(goal.id, milestone.id)}
                        className="flex items-center gap-2 text-sm w-full text-left p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        {milestone.completed ? (
                          <CheckSquare className="h-4 w-4 text-green-500" />
                        ) : (
                          <Square className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={milestone.completed ? 'line-through text-muted-foreground' : ''}>
                          {milestone.title}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </Card>
  );
}
