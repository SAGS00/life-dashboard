"use client";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/DashboardHeader";
import { QuoteWidget } from "@/components/QuoteWidget";
import { HabitTracker } from "@/components/HabitTracker";
import { JournalWidget } from "@/components/JournalWidget";
import { FinanceTracker } from "@/components/FinanceTracker";
import { TaskBoard } from "@/components/TaskBoard";
import { PomodoroTimer } from "@/components/PomodoroTimer";
import { GoalsWidget } from "@/components/GoalsWidget";
import { HealthWidget } from "@/components/HealthWidget";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
    Habit,
    JournalEntry,
    Expense,
    HealthLog,
    Goal,
    Task,
    DashboardSettings,
} from "@/types";
import { LayoutDashboard, BarChart3 } from "lucide-react";
import { APP_CONFIG, DEFAULT_ENABLED_MODULES } from "@/constants/app";

const defaultSettings: DashboardSettings = {
    theme: APP_CONFIG.defaultTheme,
    accentColor: "blue",
    enabledModules: [...DEFAULT_ENABLED_MODULES],
    dailyReminders: false,
    firstName: APP_CONFIG.defaultFirstName,
};

export default function App() {
    const [habits, setHabits] = useLocalStorage<Habit[]>(
        "life-dashboard-habits",
        []
    );
    const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>(
        "life-dashboard-journal",
        []
    );
    const [expenses, setExpenses] = useLocalStorage<Expense[]>(
        "life-dashboard-expenses",
        []
    );
    const [healthLogs, setHealthLogs] = useLocalStorage<HealthLog[]>(
        "life-dashboard-health",
        []
    );
    const [goals, setGoals] = useLocalStorage<Goal[]>(
        "life-dashboard-goals",
        []
    );
    const [tasks, setTasks] = useLocalStorage<Task[]>(
        "life-dashboard-tasks",
        []
    );
    const [settings, setSettings] = useLocalStorage<DashboardSettings>(
        "life-dashboard-settings",
        defaultSettings
    );
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Apply theme
    useEffect(() => {
        if (settings.theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [settings.theme]);

    // Habit management
    const handleAddHabit = useCallback((
        habit: Omit<Habit, "id" | "createdAt" | "completedDates">
    ) => {
        const newHabit: Habit = {
            ...habit,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            completedDates: [],
        };
        setHabits((prev) => [...prev, newHabit]);
        toast.success("Habit created successfully!");
    }, [setHabits]);

    const handleToggleHabit = useCallback((habitId: string, date: string) => {
        setHabits((prev) =>
            prev.map((habit) => {
                if (habit.id === habitId) {
                    const isCompleted = habit.completedDates.includes(date);
                    return {
                        ...habit,
                        completedDates: isCompleted
                            ? habit.completedDates.filter((d) => d !== date)
                            : [...habit.completedDates, date],
                    };
                }
                return habit;
            })
        );
    }, [setHabits]);

    const handleDeleteHabit = useCallback((habitId: string) => {
        setHabits((prev) => prev.filter((h) => h.id !== habitId));
        toast.success("Habit deleted");
    }, [setHabits]);

    // Journal management
    const handleAddJournalEntry = useCallback((
        entry: Omit<JournalEntry, "id" | "createdAt">
    ) => {
        setJournalEntries((prev) => {
            const existingEntry = prev.find((e) => e.date === entry.date);
            if (existingEntry) {
                toast.success("Journal entry updated!");
                return prev.map((e) =>
                    e.date === entry.date
                        ? { ...e, ...entry, id: e.id, createdAt: e.createdAt }
                        : e
                );
            } else {
                const newEntry: JournalEntry = {
                    ...entry,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                };
                toast.success("Journal entry saved!");
                return [newEntry, ...prev];
            }
        });
    }, [setJournalEntries]);

    // Finance management
    const handleAddExpense = useCallback((expense: Omit<Expense, "id">) => {
        if (expense.amount <= 0) {
            toast.error("Amount must be positive");
            return;
        }
        const newExpense: Expense = {
            ...expense,
            id: Date.now().toString(),
        };
        setExpenses((prev) => [newExpense, ...prev]);
        toast.success(
            `${expense.type === "income" ? "Income" : "Expense"} added!`
        );
    }, [setExpenses]);

    // Health management
    const handleAddHealthLog = useCallback((log: Omit<HealthLog, "id">) => {
        setHealthLogs((prev) => {
            const existingLog = prev.find((l) => l.date === log.date);
            if (existingLog) {
                toast.success("Health log updated!");
                return prev.map((l) =>
                    l.date === log.date ? { ...log, id: l.id } : l
                );
            } else {
                const newLog: HealthLog = {
                    ...log,
                    id: Date.now().toString(),
                };
                toast.success("Health log saved!");
                return [newLog, ...prev];
            }
        });
    }, [setHealthLogs]);

    // Goals management
    const handleAddGoal = useCallback((goal: Omit<Goal, "id" | "createdAt">) => {
        const newGoal: Goal = {
            ...goal,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setGoals((prev) => [...prev, newGoal]);
        toast.success("Goal created!");
    }, [setGoals]);

    const handleUpdateGoalProgress = useCallback((goalId: string, progress: number) => {
        setGoals((prev) => prev.map((g) => (g.id === goalId ? { ...g, progress } : g)));
    }, [setGoals]);

    const handleToggleMilestone = useCallback((goalId: string, milestoneId: string) => {
        setGoals((prev) =>
            prev.map((goal) => {
                if (goal.id === goalId) {
                    return {
                        ...goal,
                        milestones: goal.milestones.map((m) =>
                            m.id === milestoneId
                                ? { ...m, completed: !m.completed }
                                : m
                        ),
                    };
                }
                return goal;
            })
        );
    }, [setGoals]);

    // Task management
    const handleAddTask = useCallback((task: Omit<Task, "id" | "createdAt">) => {
        const newTask: Task = {
            ...task,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [...prev, newTask]);
        toast.success("Task created!");
    }, [setTasks]);

    const handleUpdateTaskStatus = useCallback((taskId: string, status: Task["status"]) => {
        setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
        if (status === "done") {
            toast.success("Task completed! 🎉");
        }
    }, [setTasks]);

    const handleDeleteTask = useCallback((taskId: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        toast.success("Task deleted");
    }, [setTasks]);

    // Settings management
    const handleToggleTheme = useCallback(() => {
        setSettings((prev) => ({
            ...prev,
            theme: prev.theme === "light" ? "dark" : "light",
        }));
    }, [setSettings]);

    const handleExportData = useCallback(() => {
        const data = {
            habits,
            journalEntries,
            expenses,
            healthLogs,
            goals,
            tasks,
            settings,
            exportedAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `life-dashboard-backup-${
            new Date().toISOString().split("T")[0]
        }.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Data exported successfully!");
    }, [habits, journalEntries, expenses, healthLogs, goals, tasks, settings]);

    const handleImportData = useCallback((jsonString: string) => {
        try {
            const data = JSON.parse(jsonString);

            // Validate data structure before importing
            if (typeof data !== 'object' || data === null) {
                throw new Error('Invalid data format');
            }

            if (data.habits) setHabits(data.habits);
            if (data.journalEntries) setJournalEntries(data.journalEntries);
            if (data.expenses) setExpenses(data.expenses);
            if (data.healthLogs) setHealthLogs(data.healthLogs);
            if (data.goals) setGoals(data.goals);
            if (data.tasks) setTasks(data.tasks);
            if (data.settings) setSettings(data.settings);
            toast.success("Data imported successfully!");
            setSettingsOpen(false);
        } catch {
            toast.error("Failed to import data. Please check the file format.");
        }
    }, [setHabits, setJournalEntries, setExpenses, setHealthLogs, setGoals, setTasks, setSettings]);

    const handleClearAllData = useCallback(() => {
        setHabits([]);
        setJournalEntries([]);
        setExpenses([]);
        setHealthLogs([]);
        setGoals([]);
        setTasks([]);
        toast.success("All data cleared");
    }, [setHabits, setJournalEntries, setExpenses, setHealthLogs, setGoals, setTasks]);

    const isModuleEnabled = useCallback((moduleId: string) =>
        settings.enabledModules.includes(moduleId)
    , [settings.enabledModules]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            <div className="max-w-7xl mx-auto p-6">
                <DashboardHeader
                    firstName={settings.firstName}
                    theme={settings.theme}
                    onThemeToggle={handleToggleTheme}
                    onSettingsClick={() => setSettingsOpen(true)}
                />

                <QuoteWidget />

                <Tabs defaultValue="dashboard" className="mt-8">
                    <TabsList className="mb-6">
                        <TabsTrigger
                            value="dashboard"
                            className="flex items-center gap-2"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            className="flex items-center gap-2"
                        >
                            <BarChart3 className="h-4 w-4" />
                            Analytics
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {isModuleEnabled("habits") && (
                                <HabitTracker
                                    habits={habits}
                                    onAddHabit={handleAddHabit}
                                    onToggleHabit={handleToggleHabit}
                                    onDeleteHabit={handleDeleteHabit}
                                />
                            )}

                            {isModuleEnabled("journal") && (
                                <JournalWidget
                                    entries={journalEntries}
                                    onAddEntry={handleAddJournalEntry}
                                />
                            )}

                            {isModuleEnabled("tasks") && (
                                <div className="lg:col-span-2">
                                    <TaskBoard
                                        tasks={tasks}
                                        onAddTask={handleAddTask}
                                        onUpdateTaskStatus={
                                            handleUpdateTaskStatus
                                        }
                                        onDeleteTask={handleDeleteTask}
                                    />
                                </div>
                            )}

                            {isModuleEnabled("finance") && (
                                <FinanceTracker
                                    expenses={expenses}
                                    onAddExpense={handleAddExpense}
                                />
                            )}

                            {isModuleEnabled("health") && (
                                <HealthWidget
                                    healthLogs={healthLogs}
                                    onAddLog={handleAddHealthLog}
                                />
                            )}

                            {isModuleEnabled("goals") && (
                                <GoalsWidget
                                    goals={goals}
                                    onAddGoal={handleAddGoal}
                                    onUpdateProgress={handleUpdateGoalProgress}
                                    onToggleMilestone={handleToggleMilestone}
                                />
                            )}

                            {isModuleEnabled("pomodoro") && <PomodoroTimer />}
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <AnalyticsDashboard
                            habits={habits}
                            tasks={tasks}
                            journalEntries={journalEntries}
                            healthLogs={healthLogs}
                        />
                    </TabsContent>
                </Tabs>

                <SettingsDialog
                    isOpen={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                    settings={settings}
                    onUpdateSettings={setSettings}
                    onExportData={handleExportData}
                    onImportData={handleImportData}
                    onClearAllData={handleClearAllData}
                />

                <Toaster />
            </div>
        </div>
    );
}
