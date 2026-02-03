import React from 'react';
import { Task } from '../../types/todo.types';
import { useTodoStore } from '../../store/todoStore';

interface CalendarTasksProps {
  date: Date;
  tasks: Task[];
}

const CalendarTasks: React.FC<CalendarTasksProps> = ({ date, tasks }) => {
  const { toggleTask } = useTodoStore();
  
  const formatTime = (date: Date | string | undefined) => {
    if (!date) return '';
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Helper function to ensure we're working with Date objects
  const getDateObj = (date: Date | string | undefined): Date | undefined => {
    if (!date) return undefined;
    return date instanceof Date ? date : new Date(date);
  };

  return (
    <section className="flex-1 bg-calendar-warm dark:bg-dark-charcoal">
      <div className="max-w-md mx-auto">
        {/* Date Header */}
        <div className="px-4 py-5 flex items-center justify-between">
          <h3 className="text-sm font-bold text-calendar-cocoa dark:text-light-cream uppercase tracking-widest">
            {formatDay(date)}
          </h3>
          <span className="text-xs font-medium text-calendar-sepia dark:text-muted-cream bg-stone-200/50 dark:border dark:border-dark-brown-grid px-2 py-0.5 rounded">
            {tasks.length} TASK{tasks.length !== 1 ? 'S' : ''}
          </span>
        </div>

        {/* Tasks List */}
        <div className="space-y-px bg-calendar-grid/30 dark:bg-dark-brown-grid/30">
          {tasks.map(task => {
            const dueDate = getDateObj(task.dueDate);
            
            return (
              <div 
                key={task.id}
                className={`bg-white dark:bg-dark-surface px-4 py-4 flex items-center gap-4 ${
                  task.priority === 'high' 
                    ? 'border-l-4 border-calendar-yellow dark:border-dark-calendar-yellow' 
                    : 'group hover:bg-stone-50 dark:hover:bg-white/5'
                } transition-colors`}
              >
                <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="custom-checkbox"
                />
                
                <div className="flex-1 min-w-0">
                  <p className={`text-[15px] ${
                    task.completed 
                      ? 'font-medium text-calendar-sepia dark:text-muted-cream line-through decoration-stone-300 dark:decoration-dark-brown-grid' 
                      : 'font-semibold text-calendar-cocoa dark:text-light-cream'
                  }`}>
                    {task.title}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-0.5">
                    {task.recurrence ? (
                      <>
                        <span className="material-symbols-outlined text-sm text-calendar-sepia dark:text-muted-cream">
                          update
                        </span>
                        <span className="text-xs text-calendar-sepia dark:text-muted-cream">
                          {formatTime(dueDate)} • Recurrent
                        </span>
                      </>
                    ) : task.subtasks && task.subtasks.length > 0 ? (
                      <>
                        <span className="material-symbols-outlined text-sm text-calendar-sepia dark:text-muted-cream">
                          account_tree
                        </span>
                        <span className="text-xs text-calendar-sepia dark:text-muted-cream">
                          {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks
                        </span>
                      </>
                    ) : dueDate ? (
                      <>
                        <span className="material-symbols-outlined text-sm text-calendar-sepia dark:text-muted-cream">
                          schedule
                        </span>
                        <span className="text-xs text-calendar-sepia dark:text-muted-cream">
                          {formatTime(dueDate)}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>

                {task.priority === 'high' && (
                  <div className="shrink-0">
                    <span className="text-[10px] font-bold text-calendar-yellow dark:text-dark-calendar-yellow bg-calendar-yellow/10 dark:bg-dark-calendar-yellow/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      Priority
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CalendarTasks;