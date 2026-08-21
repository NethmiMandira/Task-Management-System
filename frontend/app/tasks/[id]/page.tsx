"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Task } from "@/types/task";
import { api } from "@/services/api";
import TaskForm from "@/components/TaskForm";
import ConfirmModal from "@/components/ConfirmModal";

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Confirmation Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<Omit<
    Task,
    "_id"
  > | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await api.getTaskById(id);
        setTask(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleFormSubmit = async (formData: Omit<Task, "_id">) => {
    setPendingFormData(formData);
    setShowUpdateModal(true);
  };

  const confirmUpdate = async () => {
    if (!pendingFormData) return;
    try {
      const updated = await api.updateTask(id, pendingFormData);
      setTask(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setShowUpdateModal(false);
      setPendingFormData(null);
    }
  };

  const confirmDelete = async () => {
    try {
      await api.deleteTask(id);
      router.push("/tasks");
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const getBadgeClass = (status: Task["status"]) => {
    switch (status) {
      case "Pending":
        return "badge-pending";
      case "In Progress":
        return "badge-in-progress";
      case "Completed":
        return "badge-completed";
      default:
        return "badge-pending";
    }
  };

  const getDotClass = (status: Task["status"]) => {
    switch (status) {
      case "Pending":
        return "dot-pending";
      case "In Progress":
        return "dot-in-progress";
      case "Completed":
        return "dot-completed";
      default:
        return "dot-pending";
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-[#0f172a] p-6 flex justify-center items-center">
        <div className="text-slate-500 text-sm font-medium">
          Loading task details...
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-[#0f172a] p-6 flex flex-col justify-center items-center gap-4">
        <div className="text-slate-500 text-sm font-medium">
          Task not found.
        </div>
        <Link
          href="/tasks"
          className="text-indigo-600 font-medium text-sm hover:underline"
        >
          ← Back to Tasks
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a] p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/tasks"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-none text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 shadow-sm transition-all duration-150"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {isEditing ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h1 className="text-xl font-bold text-slate-800">Edit Task</h1>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                Cancel
              </button>
            </div>
            <TaskForm
              initialData={task}
              onSubmit={handleFormSubmit}
              submitLabel="Update Task"
              buttonVariant="emerald"
            />
          </div>
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex justify-between items-start mb-4 gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {task.title}
              </h1>
              <span
                className={`text-xs px-3 py-1 rounded-full border font-semibold inline-flex items-center gap-1.5 whitespace-nowrap ${getBadgeClass(
                  task.status,
                )}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${getDotClass(task.status)}`}
                ></span>
                {task.status}
              </span>
            </div>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed whitespace-pre-wrap">
              {task.description || "No description provided."}
            </p>

            <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-xs text-slate-500 font-medium">
                Due Date:{" "}
                <span className="text-slate-800 font-semibold">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
                >
                  Edit Task
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200/60 text-rose-600 font-medium text-xs transition-colors cursor-pointer"
                >
                  Delete Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Task?"
        message="This action cannot be undone. Are you sure you want to permanently delete this task?"
        confirmText="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      <ConfirmModal
        isOpen={showUpdateModal}
        title="Update Task?"
        message="Are you sure you want to save these changes to the task?"
        confirmText="Update"
        variant="success"
        onConfirm={confirmUpdate}
        onCancel={() => {
          setShowUpdateModal(false);
          setPendingFormData(null);
        }}
      />
    </main>
  );
}
