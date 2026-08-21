import { Task } from "../types/task";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export const api = {
  async getTasks(): Promise<Task[]> {
    const res = await fetch(API_BASE_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  async getTaskById(id: string): Promise<Task> {
    const res = await fetch(`${API_BASE_URL}/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch task");
    return res.json();
  },

  async createTask(task: Omit<Task, "_id">): Promise<Task> {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  },

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  async deleteTask(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
  },
};