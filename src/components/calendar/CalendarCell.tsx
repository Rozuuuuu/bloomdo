import React from 'react';
import { Task } from '../../types/todo.types';

interface CalendarCellProps {
  date: Date;
  isCurrentMonth: boolean;
  tasks: Task[];
  isSelected: boolean;
  onSelect: () => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  isCurrentMonth,
  tasks,
  isSelected,
  onSelect,
}) => {
  const day = date.getDate();
  const hasTasks = tasks.length > 0;
  
  // Count tasks by priority for indicators
  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(t => t.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(t => t.priority === 'low').length;

  return (
    <div 
      className={`calendar-cell p-1 ${isSelected ? 'relative flex items-center justify-center' : ''}`}
      onClick={onSelect}
    >
      {isSelected ? (
        <div className="size-7 rounded-full bg-golden-yellow dark:bg-dark-calendar-yellow flex items-center justify-center shadow-[0_0_12px_rgba(255,191,0,0.4)]">
          <span className="text-xs font-bold text-cocoa-brown dark:text-dark-charcoal">
            {day}
          </span>
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-between h-full ${isCurrentMonth ? 'text-cocoa-brown dark:text-light-cream' : 'text-stone-300 dark:text-dark-brown-grid'}`}>
          <span className="text-xs font-medium">{day}</span>
          
          {/* Task indicators */}
          {hasTasks && (
            <div className="flex gap-0.5 mb-1">
              {highPriorityTasks > 0 && (
                <div className="size-1 bg-amber-accent dark:bg-amber-vibrant rounded-full"></div>
              )}
              {mediumPriorityTasks > 0 && (
                <div className="size-1 bg-calendar-sepia dark:bg-muted-cream rounded-full"></div>
              )}
              {lowPriorityTasks > 0 && (
                <div className="size-1 bg-leaf-green dark:bg-dark-calendar-green rounded-full"></div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarCell;