"use client";

import Link from "next/link";
import { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (task: Task, newStatus: Task["status"]) => void;
}

export default function TaskCard({
  task,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const getBadgeClass = (status: Task["status"]) => {
    switch (status) {
      case "Pending":
        return { badge: "badge-pending", dot: "dot-pending animate-pulse" };
      case "In Progress":
        return {
          badge: "badge-in-progress",
          dot: "dot-in-progress animate-ping",
        };
      case "Completed":
        return { badge: "badge-completed", dot: "dot-completed" };
      default:
        return {
          badge: "bg-slate-100 text-slate-800 border-slate-200",
          dot: "bg-slate-400",
        };
    }
  };

  const currentStatus = getBadgeClass(task.status);

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4 gap-3">
          <Link
            href={`/tasks/${task._id}`}
            className="text-base font-bold text-slate-900 hover:text-indigo-600 line-clamp-1 transition-colors tracking-tight"
          >
            {task.title}
          </Link>

          <div
            className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border font-bold whitespace-nowrap shadow-2xs ${currentStatus.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
            {task.status}
          </div>
        </div>

        <p className="text-slate-600 text-xs leading-relaxed mb-6 line-clamp-2">
          {task.description ||
            "No detailed description provided for this task."}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500 text-[11px] font-semibold bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>

          <select
            value={task.status}
            onChange={(e) =>
              onStatusChange(task, e.target.value as Task["status"])
            }
            className="bg-slate-50 border border-slate-200 text-slate-800 text-[11px] rounded-xl px-3 py-1 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-1">
          <Link
            href={`/tasks/${task._id}`}
            className="px-3 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 hover:border-transparent text-[11px] font-semibold transition-all duration-200"
          >
            View Details →
          </Link>

          <button
            onClick={() => task._id && onDelete(task._id)}
            className="px-3 py-1 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white border border-rose-200 hover:border-transparent text-[11px] font-semibold transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
