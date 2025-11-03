import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
    BookOpen,
    Plus,
    Smile,
    Frown,
    Meh,
    TrendingDown,
    Star,
} from "lucide-react";
import { JournalEntry } from "../types";
import { getToday } from "../utils/dates";

type JournalWidgetProps = {
    entries: JournalEntry[];
    onAddEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
};

const moodOptions = [
    {
        value: "great" as const,
        label: "Great",
        icon: Star,
        color: "text-green-600",
    },
    {
        value: "good" as const,
        label: "Good",
        icon: Smile,
        color: "text-blue-600",
    },
    {
        value: "okay" as const,
        label: "Okay",
        icon: Meh,
        color: "text-yellow-600",
    },
    {
        value: "bad" as const,
        label: "Bad",
        icon: Frown,
        color: "text-orange-600",
    },
    {
        value: "terrible" as const,
        label: "Terrible",
        icon: TrendingDown,
        color: "text-red-600",
    },
];

export function JournalWidget({ entries, onAddEntry }: JournalWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState("");
    const [mood, setMood] = useState<JournalEntry["mood"]>("good");
    const today = getToday();

    const todayEntry = entries.find((e) => e.date === today);
    const recentEntries = entries.slice(0, 3);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onAddEntry({
                date: today,
                content,
                mood,
                tags: [],
            });
            setContent("");
            setMood("good");
            setIsOpen(false);
        }
    };

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <h2 className="text-xl">Journal</h2>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            {todayEntry ? "Update Entry" : "New Entry"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                Journal Entry -{" "}
                                {new Date().toLocaleDateString()}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>How are you feeling today?</Label>
                                <div className="flex gap-2 mt-2">
                                    {moodOptions.map((option) => {
                                        const Icon = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() =>
                                                    setMood(option.value)
                                                }
                                                className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                                                    mood === option.value
                                                        ? "border-primary bg-primary/5 scale-105"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            >
                                                <Icon
                                                    className={`h-6 w-6 mx-auto mb-1 ${option.color}`}
                                                />
                                                <div className="text-sm">
                                                    {option.label}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="journal-content">
                                    {`What's on your mind?`}
                                </Label>
                                <Textarea
                                    id="journal-content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write about your day, thoughts, or anything you'd like to reflect on..."
                                    rows={8}
                                    className="mt-2"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Save Entry
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {todayEntry ? (
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                        {moodOptions.find((m) => m.value === todayEntry.mood)
                            ?.icon && (
                            <div
                                className={
                                    moodOptions.find(
                                        (m) => m.value === todayEntry.mood
                                    )?.color
                                }
                            >
                                {(() => {
                                    const Icon = moodOptions.find(
                                        (m) => m.value === todayEntry.mood
                                    )!.icon;
                                    return <Icon className="h-5 w-5" />;
                                })()}
                            </div>
                        )}
                        <span className="text-sm">Today's Entry</span>
                    </div>
                    <p className="text-sm line-clamp-3">{todayEntry.content}</p>
                </div>
            ) : (
                <div className="text-center py-6 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No entry for today yet</p>
                </div>
            )}

            {recentEntries.length > 0 && !todayEntry && (
                <div className="mt-4 space-y-2">
                    <h3 className="text-sm text-muted-foreground">
                        Recent Entries
                    </h3>
                    {recentEntries.map((entry) => (
                        <div
                            key={entry.id}
                            className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-muted-foreground">
                                    {new Date(entry.date).toLocaleDateString()}
                                </span>
                                {moodOptions.find((m) => m.value === entry.mood)
                                    ?.icon && (
                                    <div
                                        className={
                                            moodOptions.find(
                                                (m) => m.value === entry.mood
                                            )?.color
                                        }
                                    >
                                        {(() => {
                                            const Icon = moodOptions.find(
                                                (m) => m.value === entry.mood
                                            )!.icon;
                                            return <Icon className="h-4 w-4" />;
                                        })()}
                                    </div>
                                )}
                            </div>
                            <p className="line-clamp-2">{entry.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}
