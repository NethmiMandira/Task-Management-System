import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TaskModel from '../models/Task.ts'; 

dotenv.config();

// Task Types
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskmanager';

// Initial Sample Data
const initialTasks: Task[] = [
  {
    title: 'Design Wireframes',
    description: 'Create initial UI mockups for the main dashboard layout.',
    status: 'Completed',
    dueDate: new Date('2026-08-25').toISOString(),
  },
  {
    title: 'Setup API Routing',
    description: 'Configure Express routes and CRUD endpoints for tasks.',
    status: 'In Progress',
    dueDate: new Date('2026-08-28').toISOString(),
  },
  {
    title: 'Deploy Application',
    description: 'Configure environment variables and deploy production build.',
    status: 'Pending',
    dueDate: new Date('2026-08-30').toISOString(),
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    await TaskModel.deleteMany({});
    console.log('Cleared existing tasks.');

    await TaskModel.insertMany(initialTasks);
    console.log('Database seeded successfully with initial tasks!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();