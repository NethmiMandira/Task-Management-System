"use client";

import { Task } from "../types/task";

interface TaskFilterTabsProps {
  currentFilter: string;
  onFilterChange: (status: string) => void;
  tasks: Task[];
}

const STACK_FILTERS = ["All", "Pending", "In Progress", "Completed"];

export default function TaskFilterTabs({
  currentFilter,
  onFilterChange,
  tasks,
}: TaskFilterTabsProps) {
  // Get count for each filter
  const getTaskCount = (status: string) => {
    if (status === "All") return tasks.length;
    return tasks.filter((task) => task.status === status).length;
  };

  const getFilterTabStyle = (status: string) => {
    const isActive = currentFilter === status;

    switch (status) {
      case "All":
        return isActive
          ? "bg-slate-900 text-white shadow-md"
          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100";
      case "Pending":
        return isActive
          ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
          : "bg-amber-50/80 border border-amber-200 text-amber-800 hover:bg-amber-100";
      case "In Progress":
        return isActive
          ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
          : "bg-purple-50/80 border border-purple-200 text-purple-800 hover:bg-purple-100";
      case "Completed":
        return isActive
          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
          : "bg-emerald-50/80 border border-emerald-200 text-emerald-800 hover:bg-emerald-100";
      default:
        return "bg-white border border-slate-200 text-slate-600";
    }
  };

  const getCountBadgeStyle = (status: string) => {
    const isActive = currentFilter === status;

    if (isActive) {
      return "bg-white/20 text-white";
    }

    switch (status) {
      case "Pending":
        return "bg-amber-200/60 text-amber-900";
      case "In Progress":
        return "bg-purple-200/60 text-purple-900";
      case "Completed":
        return "bg-emerald-200/60 text-emerald-900";
      default:
        return "bg-slate-200/70 text-slate-700";
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5 border-b border-slate-200/80 pb-4">
      {STACK_FILTERS.map((status) => {
        const count = getTaskCount(status);

        return (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${getFilterTabStyle(
              status,
            )}`}
          >
            <span>{status}</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold transition-colors ${getCountBadgeStyle(
                status,
              )}`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
