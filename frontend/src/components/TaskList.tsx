import React, { useState, useEffect } from 'react';
import { Task } from '../types/task';
import TaskItem from './TaskItems';
import TaskForm from './TaskForm';
import { taskAPI } from '../services/api';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const fetchedTasks = await taskAPI.getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTask = async (newTask: Task) => {
    try {
      const createdTask = await taskAPI.createTask(newTask);
      setTasks([createdTask, ...tasks]);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please try again.');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      if (!updatedTask._id) return;
      
      const result = await taskAPI.updateTask(updatedTask._id, updatedTask);
      
      setTasks(tasks.map(task => 
        task._id === result._id ? result : task
      ));
      
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
        setError('Failed to delete task. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <TaskForm 
            onSubmit={editingTask ? handleUpdateTask : handleAddTask} 
            initialTask={editingTask}
            isEditing={!!editingTask}
            onCancel={handleCancel}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          
          {isLoading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Add a new task to get started!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
