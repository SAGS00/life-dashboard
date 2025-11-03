import { Circle, PlayCircle, CheckCircle2 } from "lucide-react";

export const TASK_STATUS_CONFIG = {
    todo: {
        label: "To Do",
        icon: Circle,
        color: "text-gray-500",
    },
    inprogress: {
        label: "In Progress",
        icon: PlayCircle,
        color: "text-blue-500",
    },
    done: {
        label: "Done",
        icon: CheckCircle2,
        color: "text-green-500",
    },
} as const;

export const TASK_PRIORITY_COLORS = {
    low: "border-l-4 border-l-green-500",
    medium: "border-l-4 border-l-yellow-500",
    high: "border-l-4 border-l-red-500",
} as const;
