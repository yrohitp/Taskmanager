import { Request, Response } from 'express';
import Task from '../models/Task';
import { ITask } from '../types/task';

// Get all tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get task by ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Error getting task by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskData: ITask = req.body;
    const newTask = await Task.create(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskData: ITask = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      taskData,
      { new: true }
    );
    
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
