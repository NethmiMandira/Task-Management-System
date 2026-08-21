export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}