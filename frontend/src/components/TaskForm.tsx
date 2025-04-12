import React, { useState, useEffect } from 'react';
import { Task} from '../types/task';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task | null;
  isEditing: boolean;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  initialTask = null, 
  isEditing,
  onCancel
}) => {
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  });

  useEffect(() => {
    if (initialTask) {
      setTask({
        ...initialTask,
        dueDate: initialTask.dueDate 
          ? new Date(initialTask.dueDate).toISOString().split('T')[0] 
          : ''
      });
    }
  }, [initialTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
    if (!isEditing) {
      setTask({
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className=" text-gray-700 text-xl font-semibold mb-4">
        {isEditing ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Task title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={task.description || ''}
            onChange={handleChange}
            placeholder="Task description"
            rows={3}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date (Optional)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dueDate"
            type="date"
            name="dueDate"
            value={task.dueDate || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
