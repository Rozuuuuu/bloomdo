import React from 'react'; // Remove useState import
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/tasks/TaskForm';
import { useTodoStore } from '../store/todoStore';
import { Task } from '../types/todo.types';
import { toast } from 'react-hot-toast';

const TaskCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addTask, updateTask, getTaskById } = useTodoStore();
  
  const existingTask = id ? getTaskById(id) : undefined;

  const handleSubmit = (taskData: Partial<Task>) => {
    try {
      if (id && existingTask) {
        // Update existing task
        updateTask(id, taskData);
        toast.success('Task updated successfully!');
      } else {
        // Create new task
        addTask({
          ...taskData as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>,
          completed: false,
          category: 'today',
        });
        toast.success('Task created successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error('Failed to save task. Please try again.');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <TaskForm
      task={existingTask}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default TaskCreatePage;