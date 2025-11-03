import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { Progress } from './ui/progress';

const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      if (!isBreak) {
        setSessionsCompleted((prev) => prev + 1);
      }
      setIsRunning(false);
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? WORK_TIME : BREAK_TIME);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="h-5 w-5" />
        <h2 className="text-xl">Pomodoro Timer</h2>
      </div>

      <div className="text-center">
        <div className={`inline-block px-4 py-2 rounded-lg mb-4 ${
          isBreak 
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
            : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
        }`}>
          {isBreak ? 'Break Time' : 'Focus Time'}
        </div>

        <div className="text-6xl mb-6 tabular-nums">
          {formatTime(timeLeft)}
        </div>

        <Progress value={progress} className="mb-4" />

        <div className="flex gap-2 justify-center mb-4">
          <Button onClick={toggleTimer} size="lg">
            {isRunning ? (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Start
              </>
            )}
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg">
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          Sessions completed today: <span className="font-semibold">{sessionsCompleted}</span>
        </div>
      </div>
    </Card>
  );
}
