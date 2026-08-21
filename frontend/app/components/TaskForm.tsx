"use client";

import { useState } from "react";
import { Task } from "@/types/task";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (formData: Omit<Task, "_id">) => void | Promise<void>;
  submitLabel?: string;
  buttonVariant?: "indigo" | "emerald";
}

export default function TaskForm({
  initialData,
  onSubmit,
  submitLabel = "Submit",
  buttonVariant = "indigo",
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<Task["status"]>(
    initialData?.status || "Pending"
  );
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate
      ? new Date(initialData.dueDate).toISOString().split("T")[0]
      : ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    onSubmit({
      title,
      description,
      status,
      dueDate: new Date(dueDate).toISOString(),
    });
  };

  const buttonStyles =
    buttonVariant === "emerald"
      ? "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-emerald-600/25"
      : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-600/25";

  const focusStyles =
    buttonVariant === "emerald"
      ? "focus:ring-emerald-500/20 focus:border-emerald-500"
      : "focus:ring-indigo-500/20 focus:border-indigo-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Task Title <span className="text-indigo-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Redesign Dashboard Analytics UI"
          className={`w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${focusStyles} transition-all`}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Briefly describe project details, requirements, or scope..."
          className={`w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${focusStyles} transition-all resize-none`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Initial Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className={`w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 ${focusStyles} transition-all cursor-pointer`}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Due Date
          </label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 ${focusStyles} transition-all`}
          />
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-3.5 px-6 rounded-2xl ${buttonStyles} text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition-all duration-200 cursor-pointer`}
      >
        {submitLabel}
      </button>
    </form>
  );
}