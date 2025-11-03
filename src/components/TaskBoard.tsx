import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, CheckCircle2, Circle, PlayCircle, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { motion } from 'motion/react';

type TaskBoardProps = {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdateTaskStatus: (taskId: string, status: Task['status']) => void;
  onDeleteTask: (taskId: string) => void;
};

const statusConfig = {
  todo: { label: 'To Do', icon: Circle, color: 'text-gray-500' },
  inprogress: { label: 'In Progress', icon: PlayCircle, color: 'text-blue-500' },
  done: { label: 'Done', icon: CheckCircle2, color: 'text-green-500' },
};

export function TaskBoard({ tasks, onAddTask, onUpdateTaskStatus, onDeleteTask }: TaskBoardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      onAddTask({
        ...newTask,
        status: 'todo',
      });
      setNewTask({ title: '', description: '', priority: 'medium' });
      setIsOpen(false);
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const priorityColors = {
    low: 'border-l-4 border-l-green-500',
    medium: 'border-l-4 border-l-yellow-500',
    high: 'border-l-4 border-l-red-500',
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Task Board</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="What needs to be done?"
                />
              </div>
              <div>
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Add more details..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="task-priority">Priority</Label>
                <Select 
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) => 
                    setNewTask({ ...newTask, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Create Task</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {(['todo', 'inprogress', 'done'] as const).map((status) => {
          const statusTasks = getTasksByStatus(status);
          const config = statusConfig[status];
          const Icon = config.icon;

          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`h-5 w-5 ${config.color}`} />
                <h3>{config.label}</h3>
                <span className="text-sm text-muted-foreground">({statusTasks.length})</span>
              </div>
              <div className="space-y-2 min-h-[200px]">
                {statusTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 bg-white dark:bg-gray-950 rounded-lg border ${priorityColors[task.priority]} shadow-sm`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm flex-1">{task.title}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex gap-1">
                      {status !== 'todo' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs flex-1"
                          onClick={() => onUpdateTaskStatus(task.id, 'todo')}
                        >
                          To Do
                        </Button>
                      )}
                      {status !== 'inprogress' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs flex-1"
                          onClick={() => onUpdateTaskStatus(task.id, 'inprogress')}
                        >
                          Progress
                        </Button>
                      )}
                      {status !== 'done' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-xs flex-1"
                          onClick={() => onUpdateTaskStatus(task.id, 'done')}
                        >
                          Done
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
