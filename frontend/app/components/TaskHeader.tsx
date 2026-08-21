"use client";

interface TaskHeaderProps {
  showCreateForm: boolean;
  onToggleForm: () => void;
}

export default function TaskHeader({
  showCreateForm,
  onToggleForm,
}: TaskHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Task Workspace
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Manage, organize, and track active project workflows.
        </p>
      </div>

      <button
        onClick={onToggleForm}
        className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        {showCreateForm ? "Cancel" : "+ New Task"}
      </button>
    </div>
  );
}
