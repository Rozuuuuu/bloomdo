import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../types/todo.types';
import { todoUtils } from '../../store/todoStore';

interface TaskCardProps {
  task: Task;
  onToggle: (taskId: string) => void;
  showCategory?: boolean;
  compact?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onToggle, 
  showCategory = false,
  compact = false 
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-badge-high';
      case 'medium':
        return 'priority-badge-medium';
      case 'low':
        return 'priority-badge-low';
      default:
        return 'priority-badge-low';
    }
  };

  const formatTime = (date: Date | string | undefined) => {
    if (!date) return null;
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return null;
    const dateObj = date instanceof Date ? date : new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (dateObj.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (dateObj.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return dateObj.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const formatRecurrence = (recurrence?: string) => {
    if (!recurrence) return null;
    return recurrence.charAt(0).toUpperCase() + recurrence.slice(1);
  };

  const getTaskIcon = () => {
    if (task.subtasks && task.subtasks.length > 0) {
      return 'account_tree';
    }
    if (task.dependencies && task.dependencies.length > 0) {
      return 'link';
    }
    if (task.recurrence) {
      return 'repeat';
    }
    if (task.tags && task.tags.includes('meeting')) {
      return 'groups';
    }
    return null;
  };

  const getTaskIconText = () => {
    if (task.subtasks && task.subtasks.length > 0) {
      const completed = task.subtasks.filter(s => s.completed).length;
      return `${completed}/${task.subtasks.length}`;
    }
    if (task.dependencies && task.dependencies.length > 0) {
      return `${task.dependencies.length} deps`;
    }
    if (task.recurrence) {
      return formatRecurrence(task.recurrence);
    }
    return null;
  };

  const getTaskIconColor = () => {
    if (task.subtasks && task.subtasks.length > 0) {
      const completed = task.subtasks.filter(s => s.completed).length;
      const total = task.subtasks.length;
      if (completed === total) return 'text-leaf-green';
      if (completed > 0) return 'text-amber-500';
      return 'text-gray-400';
    }
    if (task.dependencies && task.dependencies.length > 0) {
      return 'text-blue-500';
    }
    if (task.recurrence) {
      return 'text-purple-500';
    }
    return 'text-gray-400';
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return 'upcoming';
    
    const dueDate = task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'overdue';
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'tomorrow';
    if (diffDays <= 3) return 'soon';
    return 'upcoming';
  };

  const getDueDateClass = () => {
    const status = getDueDateStatus();
    switch (status) {
      case 'overdue':
        return 'text-red-500 dark:text-red-400';
      case 'today':
        return 'text-amber-600 dark:text-amber-500';
      case 'tomorrow':
        return 'text-amber-500 dark:text-amber-400';
      case 'soon':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-chocolate-brown/60 dark:text-ivory/60';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/task/${task.id}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(task.id);
  };

  const handleQuickAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(`${action} task: ${task.id}`);
    // You can add quick actions here
  };

  // Calculate completion percentage for progress indicator
  const getCompletionPercentage = () => {
    return todoUtils.getCompletionPercentage(task);
  };

  const completionPercentage = getCompletionPercentage();

  // Compact view for lists with many items
  if (compact) {
    return (
      <div 
        className="task-card flex items-center gap-3 px-4 py-3 border-b border-border-warm dark:border-border-dark transition-colors cursor-pointer hover:bg-[#F7F3EE] dark:hover:bg-[#1A1A1A] active:bg-[#F0ECE6] dark:active:bg-[#2A2A2A]"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Checkbox */}
        <div 
          className="flex-shrink-0"
          onClick={handleCheckboxClick}
        >
          <div className={`size-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-colors ${
            task.completed 
              ? 'bg-leaf-green dark:bg-dark-leaf-green border-leaf-green dark:border-dark-leaf-green' 
              : 'border-border-warm dark:border-border-dark hover:border-golden-yellow dark:hover:border-dark-golden bg-white dark:bg-dark-charcoal'
          }`}>
            {task.completed && (
              <span className="material-symbols-outlined text-white dark:text-near-black text-[14px]">
                check
              </span>
            )}
          </div>
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className={`text-sm font-medium truncate ${
              task.completed 
                ? 'text-chocolate-brown/50 dark:text-ivory/50 line-through' 
                : 'text-chocolate-brown dark:text-ivory'
            }`}>
              {task.title}
            </p>
            <span className={getPriorityClass(task.priority)}>
              {task.priority.charAt(0).toUpperCase()}
            </span>
          </div>
          
          {/* Progress indicator for subtasks */}
          {task.subtasks && task.subtasks.length > 0 && completionPercentage < 100 && (
            <div className="mt-1.5">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-leaf-green dark:bg-dark-leaf-green transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  {completionPercentage}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick action menu on hover */}
        {isHovered && (
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => handleQuickAction(e, 'edit')}
              className="p-1.5 text-gray-500 hover:text-golden-yellow dark:hover:text-dark-golden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
            </button>
            <button 
              onClick={(e) => handleQuickAction(e, 'schedule')}
              className="p-1.5 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="material-symbols-outlined text-[16px]">schedule</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Standard detailed view
  return (
    <div 
      className="task-card flex items-start gap-4 px-5 py-4 border-b border-border-warm dark:border-border-dark transition-colors cursor-pointer hover:bg-[#F7F3EE] dark:hover:bg-[#1A1A1A] active:bg-[#F0ECE6] dark:active:bg-[#2A2A2A]"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <div 
        className="mt-0.5 flex-shrink-0"
        onClick={handleCheckboxClick}
      >
        <div className={`size-6 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all ${
          task.completed 
            ? 'bg-leaf-green dark:bg-dark-leaf-green border-leaf-green dark:border-dark-leaf-green shadow-sm' 
            : 'border-border-warm dark:border-border-dark hover:border-golden-yellow dark:hover:border-dark-golden bg-white dark:bg-dark-charcoal hover:shadow-sm'
        }`}>
          {task.completed && (
            <span className="material-symbols-outlined text-white dark:text-near-black text-[16px]">
              check
            </span>
          )}
        </div>
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className={`text-[15px] font-semibold truncate ${
                task.completed 
                  ? 'text-chocolate-brown/50 dark:text-ivory/50 line-through' 
                  : 'text-chocolate-brown dark:text-ivory'
              }`}>
                {task.title}
              </p>
              {showCategory && task.category && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase tracking-tighter">
                  {task.category}
                </span>
              )}
            </div>
            
            {/* Description */}
            {task.description && !compact && (
              <p className="text-[13px] text-chocolate-brown/60 dark:text-ivory/60 line-clamp-2 mb-2">
                {task.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Priority Badge */}
            <span className={getPriorityClass(task.priority)}>
              {task.priority.toUpperCase()}
            </span>
            
            {/* Quick actions on hover */}
            {isHovered && (
              <div className="flex items-center gap-1 ml-1">
                <button 
                  onClick={(e) => handleQuickAction(e, 'edit')}
                  className="p-1.5 text-gray-500 hover:text-golden-yellow dark:hover:text-dark-golden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Task Meta Information */}
        <div className="flex items-center flex-wrap gap-3 mt-1.5">
          {/* Time/Date */}
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-[11px] font-medium ${getDueDateClass()}`}>
              <span className="material-symbols-outlined text-[14px]">
                {task.recurrence ? 'repeat' : 'schedule'}
              </span>
              <span>
                {task.recurrence 
                  ? formatRecurrence(task.recurrence)
                  : formatDate(task.dueDate)
                }
                {!task.recurrence && task.dueDate && (
                  <span className="ml-1">
                    • {formatTime(task.dueDate)}
                  </span>
                )}
              </span>
            </div>
          )}

          {/* Task Type Icon */}
          {getTaskIcon() && (
            <div className={`flex items-center gap-1 text-[11px] font-medium ${getTaskIconColor()}`}>
              <span className="material-symbols-outlined text-[14px]">
                {getTaskIcon()}
              </span>
              <span>{getTaskIconText()}</span>
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && !compact && (
            <div className="flex items-center gap-1">
              {task.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {task.tags.length > 2 && (
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
                  +{task.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Overdue indicator */}
          {getDueDateStatus() === 'overdue' && !task.completed && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-red-500 dark:text-red-400">
              <span className="material-symbols-outlined text-[14px]">
                warning
              </span>
              <span>Overdue</span>
            </div>
          )}

          {/* Tomorrow indicator */}
          {!task.dueDate && !task.recurrence && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-chocolate-brown/60 dark:text-ivory/60">
              <span className="material-symbols-outlined text-[14px]">
                event
              </span>
              <span>No due date</span>
            </div>
          )}
        </div>

        {/* Subtask Progress Bar */}
        {task.subtasks && task.subtasks.length > 0 && completionPercentage < 100 && !compact && (
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                Progress
              </span>
              <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">
                {completionPercentage}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-leaf-green to-golden-yellow dark:from-dark-leaf-green dark:to-dark-golden transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;