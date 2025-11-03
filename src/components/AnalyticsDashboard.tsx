import { Card } from "./ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { TrendingUp, CheckCircle, Target, Zap } from "lucide-react";
import { Habit, Task, JournalEntry, HealthLog } from "../types";
import { getLast7Days, calculateStreak } from "../utils/dates";

type AnalyticsDashboardProps = {
    habits: Habit[];
    tasks: Task[];
    journalEntries: JournalEntry[];
    healthLogs: HealthLog[];
};

export function AnalyticsDashboard({
    habits,
    tasks,
    journalEntries,
    healthLogs,
}: AnalyticsDashboardProps) {
    const last7Days = getLast7Days();

    // Calculate habit completion rate
    const habitData = last7Days.map((date) => {
        const totalHabits = habits.length;
        const completedHabits = habits.filter((h) =>
            h.completedDates.includes(date)
        ).length;
        const completionRate =
            totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

        return {
            date: new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            completion: Math.round(completionRate),
            completed: completedHabits,
        };
    });

    // Calculate overall stats
    const totalTasksCompleted = tasks.filter((t) => t.status === "done").length;
    const totalTasks = tasks.length;
    const taskCompletionRate =
        totalTasks > 0
            ? Math.round((totalTasksCompleted / totalTasks) * 100)
            : 0;

    const currentStreaks = habits.map((h) => calculateStreak(h.completedDates));
    const maxStreak =
        currentStreaks.length > 0 ? Math.max(...currentStreaks) : 0;

    const journalDays = new Set(journalEntries.map((e) => e.date)).size;

    // Mood distribution
    const moodCounts = {
        great: journalEntries.filter((e) => e.mood === "great").length,
        good: journalEntries.filter((e) => e.mood === "good").length,
        okay: journalEntries.filter((e) => e.mood === "okay").length,
        bad: journalEntries.filter((e) => e.mood === "bad").length,
        terrible: journalEntries.filter((e) => e.mood === "terrible").length,
    };

    const averageSteps =
        healthLogs.length > 0
            ? Math.round(
                  healthLogs.reduce((sum, log) => sum + log.steps, 0) /
                      healthLogs.length
              )
            : 0;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm">Task Completion</span>
                    </div>
                    <p className="text-3xl mb-1">{taskCompletionRate}%</p>
                    <p className="text-xs text-muted-foreground">
                        {totalTasksCompleted} of {totalTasks} tasks
                    </p>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-2">
                        <Zap className="h-5 w-5" />
                        <span className="text-sm">Longest Streak</span>
                    </div>
                    <p className="text-3xl mb-1">{maxStreak}</p>
                    <p className="text-xs text-muted-foreground">days</p>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                        <Target className="h-5 w-5" />
                        <span className="text-sm">Journal Entries</span>
                    </div>
                    <p className="text-3xl mb-1">{journalDays}</p>
                    <p className="text-xs text-muted-foreground">unique days</p>
                </Card>

                <Card className="p-4">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-sm">Avg Steps</span>
                    </div>
                    <p className="text-3xl mb-1">
                        {averageSteps.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">per day</p>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-xl mb-4">
                    Habit Completion Rate (Last 7 Days)
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={habitData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                style={{ fontSize: "12px" }}
                            />
                            <YAxis style={{ fontSize: "12px" }} />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="completion"
                                fill="#3b82f6"
                                name="Completion Rate %"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {journalEntries.length > 0 && (
                <Card className="p-6">
                    <h3 className="text-xl mb-4">Mood Distribution</h3>
                    <div className="grid grid-cols-5 gap-4">
                        {Object.entries(moodCounts).map(([mood, count]) => (
                            <div
                                key={mood}
                                className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                            >
                                <p className="text-2xl mb-1">{count}</p>
                                <p className="text-sm text-muted-foreground capitalize">
                                    {mood}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            <Card className="p-6">
                <h3 className="text-xl mb-4">Insights</h3>
                <div className="space-y-3">
                    {maxStreak >= 7 && (
                        <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-sm">
                                {`🎉 Amazing! You've maintained a ${maxStreak}-day streak. Keep up the great work!
                                `}
                            </p>
                        </div>
                    )}
                    {taskCompletionRate >= 80 && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <p className="text-sm">
                                {`⭐ You're crushing it with a ${taskCompletionRate}% task completion rate!
                                `}
                            </p>
                        </div>
                    )}
                    {journalDays >= 5 && (
                        <div className="p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                            <p className="text-sm">
                                {`
                                📝 Great journaling consistency! You've logged ${journalDays} days of reflections.
                                `}
                            </p>
                        </div>
                    )}
                    {averageSteps >= 8000 && (
                        <div className="p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                            <p className="text-sm">
                                {`
                                🏃 Excellent activity level! You're averaging ${averageSteps.toLocaleString()} steps per day.
                                `}
                            </p>
                        </div>
                    )}
                    {habits.length === 0 &&
                        tasks.length === 0 &&
                        journalEntries.length === 0 && (
                            <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-center">
                                <p className="text-sm text-muted-foreground">
                                    Start tracking your habits, tasks, and
                                    journal to see insights here!
                                </p>
                            </div>
                        )}
                </div>
            </Card>
        </div>
    );
}
