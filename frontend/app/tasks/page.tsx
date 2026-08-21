"use client";

import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { api } from "@/services/api";
import TaskForm from "@/components/TaskForm";
import TaskHeader from "@/components/TaskHeader";
import TaskFilterTabs from "@/components/TaskFilterTabs";
import TaskList from "@/components/TaskList";
import ConfirmModal from "@/components/ConfirmModal";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [pendingCreateData, setPendingCreateData] = useState<Omit<
    Task,
    "_id"
  > | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFormSubmit = (formData: Omit<Task, "_id">) => {
    setPendingCreateData(formData);
    setShowCreateModal(true);
  };

  const confirmCreate = async () => {
    if (!pendingCreateData) return;
    try {
      await api.createTask(pendingCreateData);
      setShowCreateForm(false);
      fetchTasks();
    } catch (err) {
      console.error("Failed to create task:", err);
    } finally {
      setShowCreateModal(false);
      setPendingCreateData(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTaskId) return;
    try {
      await api.deleteTask(deleteTaskId);
      setDeleteTaskId(null);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleStatusChange = async (task: Task, newStatus: Task["status"]) => {
    if (!task._id) return;
    try {
      await api.updateTask(task._id, { ...task, status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "All") return true;
    return t.status === filter;
  });

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        <TaskHeader
          showCreateForm={showCreateForm}
          onToggleForm={() => setShowCreateForm(!showCreateForm)}
        />

        {showCreateForm && (
          <div className="max-w-2xl mx-auto transition-all duration-300">
            <TaskForm
              onSubmit={handleFormSubmit}
              submitLabel="Create Task"
              buttonVariant="indigo"
            />
          </div>
        )}

        <TaskFilterTabs
          currentFilter={filter}
          onFilterChange={setFilter}
          tasks={tasks}
        />

        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          onDeleteTask={(id) => setDeleteTaskId(id)}
          onStatusChange={handleStatusChange}
        />
      </div>

      <ConfirmModal
        isOpen={!!deleteTaskId}
        title="Delete Task?"
        message="This action cannot be undone. Are you sure you want to permanently delete this task?"
        confirmText="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTaskId(null)}
      />

      <ConfirmModal
        isOpen={showCreateModal}
        title="Create New Task?"
        message="Are you sure you want to create and add this new task to your workspace?"
        confirmText="Create Task"
        variant="primary"
        onConfirm={confirmCreate}
        onCancel={() => {
          setShowCreateModal(false);
          setPendingCreateData(null);
        }}
      />
    </div>
  );
}
