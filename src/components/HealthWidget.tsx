import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Activity, Plus, Droplet, Moon, Footprints } from 'lucide-react';
import { HealthLog } from '../types';
import { getToday, getLast7Days } from '../utils/dates';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

type HealthWidgetProps = {
  healthLogs: HealthLog[];
  onAddLog: (log: Omit<HealthLog, 'id'>) => void;
};

export function HealthWidget({ healthLogs, onAddLog }: HealthWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const today = getToday();
  const todayLog = healthLogs.find(log => log.date === today);

  const [newLog, setNewLog] = useState({
    steps: todayLog?.steps || 0,
    sleep: todayLog?.sleep || 0,
    water: todayLog?.water || 0,
    calories: todayLog?.calories || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLog({
      date: today,
      ...newLog,
    });
    setIsOpen(false);
  };

  const last7Days = getLast7Days();
  const chartData = last7Days.map(date => {
    const log = healthLogs.find(l => l.date === date);
    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      steps: log?.steps || 0,
      sleep: log?.sleep || 0,
      water: log?.water || 0,
    };
  });

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          <h2 className="text-xl">Health & Fitness</h2>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Log Today
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Health Log - {new Date().toLocaleDateString()}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="steps">Steps</Label>
                <Input
                  id="steps"
                  type="number"
                  value={newLog.steps}
                  onChange={(e) => setNewLog({ ...newLog, steps: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="sleep">Sleep (hours)</Label>
                <Input
                  id="sleep"
                  type="number"
                  step="0.5"
                  value={newLog.sleep}
                  onChange={(e) => setNewLog({ ...newLog, sleep: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="water">Water (glasses)</Label>
                <Input
                  id="water"
                  type="number"
                  value={newLog.water}
                  onChange={(e) => setNewLog({ ...newLog, water: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  value={newLog.calories}
                  onChange={(e) => setNewLog({ ...newLog, calories: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <Button type="submit" className="w-full">Save Log</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {todayLog ? (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Footprints className="h-4 w-4" />
              <span className="text-sm">Steps</span>
            </div>
            <p className="text-2xl">{todayLog.steps.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Goal: 10,000</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Moon className="h-4 w-4" />
              <span className="text-sm">Sleep</span>
            </div>
            <p className="text-2xl">{todayLog.sleep}h</p>
            <p className="text-xs text-muted-foreground">Goal: 8h</p>
          </div>
          <div className="p-3 bg-cyan-50 dark:bg-cyan-950 rounded-lg">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-1">
              <Droplet className="h-4 w-4" />
              <span className="text-sm">Water</span>
            </div>
            <p className="text-2xl">{todayLog.water} cups</p>
            <p className="text-xs text-muted-foreground">Goal: 8 cups</p>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <Activity className="h-4 w-4" />
              <span className="text-sm">Calories</span>
            </div>
            <p className="text-2xl">{todayLog.calories}</p>
            <p className="text-xs text-muted-foreground">Tracked</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground mb-6">
          <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No health data logged for today</p>
        </div>
      )}

      {chartData.some(d => d.steps > 0 || d.sleep > 0) && (
        <div className="h-64">
          <h3 className="text-sm mb-2">7-Day Trends</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" style={{ fontSize: '12px' }} />
              <YAxis style={{ fontSize: '12px' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="steps" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="water" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
