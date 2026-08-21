"use client";

import { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onDeleteTask: (id: string) => void;
  onStatusChange: (task: Task, newStatus: Task["status"]) => void;
}

export default function TaskList({
  tasks,
  isLoading,
  onDeleteTask,
  onStatusChange,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-16 text-slate-400 font-semibold text-sm">
        Loading tasks...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md border border-dashed border-slate-300 rounded-3xl p-12 text-center text-slate-500 shadow-xs">
        <p className="font-semibold text-slate-700 text-base">No tasks found</p>
        <p className="text-xs text-slate-400 mt-1">
          Create a new task or change your filter tab to see results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
