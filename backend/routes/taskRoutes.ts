import { Router, type Request, type Response } from 'express';
import Task from '../models/Task.js';

const router = Router();

// GET all tasks
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

// GET single task
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

// POST create task
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

// PUT update task
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
});

// DELETE task
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

export default router;