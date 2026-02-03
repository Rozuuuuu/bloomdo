import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodoStore } from '../store/todoStore';
import { toast } from 'react-hot-toast';

const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getTaskById, 
    toggleSubtask,
    updateTask,
    deleteTask 
  } = useTodoStore();
  
  const task = id ? getTaskById(id) : undefined;
  const [completedSubtasks, setCompletedSubtasks] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate countdown timer
  useEffect(() => {
    if (!task?.dueDate) return;

    const calculateCountdown = () => {
      const dueDate = task.dueDate ? (task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate)) : new Date();
      const now = new Date();
      const diff = dueDate.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, [task]);

  // Calculate completed subtasks
  useEffect(() => {
    if (!task?.subtasks) {
      setCompletedSubtasks(0);
      return;
    }

    const completed = task.subtasks.filter(subtask => subtask.completed).length;
    setCompletedSubtasks(completed);
  }, [task]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleMarkComplete = () => {
    if (!task) return;
    
    if (task.completed) {
      updateTask(task.id, { completed: false });
      toast.success('Task reopened!');
    } else {
      updateTask(task.id, { completed: true });
      toast.success('Task completed! 🎉');
    }
  };

  const handleToggleSubtask = (subtaskId: string) => {
    if (!task) return;
    toggleSubtask(task.id, subtaskId);
  };

  const handleAddSubtask = () => {
    if (!task) return;
    
    const newSubtask = {
      id: `${task.id}-${Date.now()}`,
      title: 'New subtask',
      completed: false,
    };

    const currentSubtasks = task.subtasks || [];
    updateTask(task.id, {
      subtasks: [...currentSubtasks, newSubtask]
    });
  };

  const handleEditTask = () => {
    if (!task) return;
    navigate(`/edit-task/${task.id}`);
  };

  const handleDeleteTask = () => {
    if (!task) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      toast.success('Task deleted');
      navigate('/');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'No Priority';
    }
  };

  const getStatusColor = (completed: boolean) => {
    return completed 
      ? 'bg-green-500/20 text-green-400' 
      : 'bg-primary/20 text-primary';
  };

  const getStatusLabel = (completed: boolean) => {
    return completed ? 'Completed' : 'In Progress';
  };

  // If task not found, show error
  if (!task) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
            error
          </span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-ivory mb-2">
            Task Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The task you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-background-dark font-bold py-3 px-6 rounded-xl"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totalSubtasks = task.subtasks?.length || 0;
  const completionPercentage = totalSubtasks > 0 
    ? Math.round((completedSubtasks / totalSubtasks) * 100) 
    : 0;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between">
        <button 
          onClick={handleBack}
          className="text-gray-900 dark:text-ivory flex size-12 shrink-0 items-center"
        >
          <span className="material-symbols-outlined cursor-pointer">arrow_back_ios</span>
        </button>
        
        <h2 className="text-gray-900 dark:text-ivory text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Task Details
        </h2>
        
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={handleEditTask}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-gray-900 dark:text-ivory gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>

      {/* Headline and Status */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(task.completed)}`}>
            {getStatusLabel(task.completed)}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
            {getPriorityLabel(task.priority)}
          </span>
        </div>
        <h1 className="text-gray-900 dark:text-ivory tracking-tight text-[32px] font-bold leading-tight text-left">
          {task.title}
        </h1>
      </div>

      {/* Countdown Timer (only if due date exists) */}
      {task.dueDate && (
        <div className="px-4 mt-4">
          <div className="bg-surface-dark/40 dark:bg-surface-dark border border-white/5 rounded-xl p-4 shadow-inner">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">
              Deadline Countdown
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Mins', value: countdown.minutes },
                { label: 'Secs', value: countdown.seconds },
              ].map((item) => (
                <div key={item.label} className="flex grow basis-0 flex-col items-stretch gap-2">
                  <div className="flex h-16 grow items-center justify-center rounded-lg px-3 bg-primary/10 border border-primary/20">
                    <p className="text-primary text-2xl font-bold leading-tight tracking-[-0.015em]">
                      {item.value.toString().padStart(2, '0')}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Description Section */}
      <h3 className="text-gray-900 dark:text-ivory text-sm font-bold leading-tight tracking-widest px-4 pb-2 pt-8 uppercase opacity-60">
        Description
      </h3>
      <div className="px-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {task.description || 'No description provided.'}
        </p>
      </div>

      {/* Subtasks Checklist Section */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between px-4 pb-2">
            <h3 className="text-gray-900 dark:text-ivory text-sm font-bold leading-tight tracking-widest uppercase opacity-60">
              Sub-tasks
            </h3>
            <span className="text-primary text-xs font-bold">
              {completedSubtasks} of {totalSubtasks} Done
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="flex flex-col gap-2 px-4 pb-4">
            <div className="rounded-full bg-gray-200 dark:bg-gray-800 h-1.5 overflow-hidden">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-300" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Subtask List */}
          <div className="space-y-1 px-4">
            {task.subtasks.map((subtask) => (
              <div 
                key={subtask.id}
                className="flex items-center gap-3 p-3 bg-surface-dark/20 dark:bg-surface-dark/50 rounded-lg border border-white/5 cursor-pointer hover:bg-surface-dark/30 transition-colors"
                onClick={() => handleToggleSubtask(subtask.id)}
              >
                <span className={`material-symbols-outlined ${subtask.completed ? 'text-primary filled' : 'text-gray-400'}`}>
                  {subtask.completed ? 'check_box' : 'check_box_outline_blank'}
                </span>
                <p className={`text-sm ${subtask.completed ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-ivory'}`}>
                  {subtask.title}
                </p>
              </div>
            ))}
            
            <button 
              onClick={handleAddSubtask}
              className="flex items-center gap-2 p-3 text-primary text-sm font-bold"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Sub-task
            </button>
          </div>
        </div>
      )}

      {/* Dependencies Section */}
      <div className="mt-6 mb-24">
        <h3 className="text-gray-900 dark:text-ivory text-sm font-bold leading-tight tracking-widest px-4 pb-3 uppercase opacity-60">
          Dependencies
        </h3>
        
        <div className="px-4 space-y-4">
          {/* Waiting on (Blockers) */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
              Waiting on (Blockers)
            </p>
            
            {task.dependencies && task.dependencies.length > 0 ? (
              <div className="space-y-2">
                {task.dependencies.map((dependencyId) => {
                  const dependencyTask = getTaskById(dependencyId);
                  if (!dependencyTask) return null;
                  
                  return (
                    <div 
                      key={dependencyId}
                      className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg cursor-pointer hover:bg-red-500/15 transition-colors"
                      onClick={() => navigate(`/task/${dependencyId}`)}
                    >
                      <span className="material-symbols-outlined text-red-400 text-xl">
                        {dependencyTask.completed ? 'check_circle' : 'error'}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-ivory">
                          {dependencyTask.title}
                        </p>
                        <p className="text-[10px] text-red-400">
                          Status: {dependencyTask.completed ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-gray-500">
                        chevron_right
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-surface-dark/20 dark:bg-surface-dark/50 rounded-lg">
                <span className="material-symbols-outlined text-gray-500 text-xl">
                  check
                </span>
                <p className="text-sm text-gray-500">
                  No blockers. This task is ready to start.
                </p>
              </div>
            )}
          </div>

          {/* Tasks that depend on this one */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
              Blocks
            </p>
            
            {(() => {
              // Find tasks that have this task as a dependency
              const blockingTasks = useTodoStore.getState().tasks.filter(t => 
                t.dependencies?.includes(task.id)
              );
              
              if (blockingTasks.length > 0) {
                return (
                  <div className="space-y-2">
                    {blockingTasks.map((blockingTask) => (
                      <div 
                        key={blockingTask.id}
                        className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/15 transition-colors"
                        onClick={() => navigate(`/task/${blockingTask.id}`)}
                      >
                        <span className="material-symbols-outlined text-primary text-xl">
                          link
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-ivory">
                            {blockingTask.title}
                          </p>
                          <p className="text-[10px] text-primary">
                            Dependency Level: {blockingTask.priority === 'high' ? 'High' : 'Normal'}
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-gray-500">
                          chevron_right
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }
              
              return (
                <div className="flex items-center gap-3 p-3 bg-surface-dark/20 dark:bg-surface-dark/50 rounded-lg">
                  <span className="material-symbols-outlined text-gray-500 text-xl">
                    link_off
                  </span>
                  <p className="text-sm text-gray-500">
                    No tasks depend on this one.
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <div className="flex gap-3">
          <button 
            onClick={handleDeleteTask}
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold py-4 rounded-xl border border-red-500/30 flex items-center justify-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined">delete</span>
            Delete
          </button>
          
          <button 
            onClick={handleMarkComplete}
            className={`flex-1 font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors ${
              task.completed
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-primary hover:bg-primary/90 text-background-dark'
            }`}
          >
            <span className="material-symbols-outlined filled">
              {task.completed ? 'undo' : 'check_circle'}
            </span>
            {task.completed ? 'Reopen Task' : 'Mark Complete'}
          </button>
        </div>
      </div>
      
      <div className="h-24"></div>
    </div>
  );
};

export default TaskDetailsPage;