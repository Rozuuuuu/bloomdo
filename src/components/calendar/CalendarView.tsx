import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Task } from '../../types/todo.types';
import { useTodoStore } from '../../store/todoStore';
import CalendarCell from './CalendarCell';

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  tasks: Task[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ selectedDate, onDateSelect, tasks }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const { searchQuery, setSearchQuery } = useTodoStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery('');
    } else {
      setIsSearchOpen(true);
    }
  };

  // Generate calendar days for current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and total days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay(); // 0 = Sunday

  // Generate calendar days
  const calendarDays = [];

  // Previous month days
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = startingDay - 1; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - 1, prevMonthLastDay - i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      tasks: [] as Task[],
    });
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const dayTasks = tasks.filter(task => {
      // Date Check
      if (!task.dueDate) return false;
      const dueDate = task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);
      const isSameDay = (
        dueDate.getDate() === date.getDate() &&
        dueDate.getMonth() === date.getMonth() &&
        dueDate.getFullYear() === date.getFullYear()
      );

      if (!isSameDay) return false;

      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });

    calendarDays.push({
      date,
      isCurrentMonth: true,
      tasks: dayTasks,
    });
  }

  // Next month days (to fill the grid)
  const totalCells = 42; // 6 weeks * 7 days
  const nextMonthDays = totalCells - calendarDays.length;
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(currentYear, currentMonth + 1, i);
    calendarDays.push({
      date,
      isCurrentMonth: false,
      tasks: [] as Task[],
    });
  }

  const handleFeatureClick = (feature: string) => {
    toast(`${feature} coming soon!`, { icon: '🚧' });
  };

  return (
    <div className="bg-white dark:bg-dark-charcoal">
      {/* Calendar Header */}
      <header className="sticky top-[73px] z-40 bg-white/90 dark:bg-dark-charcoal/80 backdrop-blur-md border-b border-grid-brown dark:border-dark-brown-grid transition-colors">
        <div className="flex items-center px-4 h-16 justify-between">
          {isSearchOpen ? (
            <div className="flex items-center w-full gap-2 animate-fade-in-right">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 dark:text-ivory/50">
                  search
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-1.5 bg-stone-50 dark:bg-white/5 border border-grid-brown dark:border-white/10 rounded-lg text-cocoa-brown dark:text-light-cream placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                />
              </div>
              <button
                onClick={handleSearchToggle}
                className="p-1.5 text-gray-500 dark:text-ivory/60 hover:text-cocoa-brown dark:hover:text-light-cream bg-transparent rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 animate-fade-in-left">
                <button
                  onClick={() => handleFeatureClick('Menu')}
                  className="p-2 -ml-2 text-cocoa-brown dark:text-light-cream hover:bg-stone-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined">menu</span>
                </button>
                <h1 className="text-lg font-semibold tracking-tight text-cocoa-brown dark:text-light-cream">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h1>
              </div>
              <div className="flex items-center gap-1 animate-fade-in">
                <button
                  onClick={handleSearchToggle}
                  className="p-2 text-cocoa-brown dark:text-light-cream hover:bg-stone-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">search</span>
                </button>
                <button
                  onClick={() => handleFeatureClick('Filters')}
                  className="p-2 text-cocoa-brown dark:text-light-cream hover:bg-stone-100 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">tune</span>
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Days of Week */}
      <div className="grid grid-cols-7 border-b border-grid-brown dark:border-dark-brown-grid">
        {daysOfWeek.map(day => (
          <p key={day} className="text-[11px] font-bold text-sepia-brown dark:text-muted-cream uppercase tracking-wider py-3 text-center">
            {day}
          </p>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {calendarDays.slice(0, 42).map((day, index) => (
          <CalendarCell
            key={index}
            date={day.date}
            isCurrentMonth={day.isCurrentMonth}
            tasks={day.tasks}
            isSelected={day.date.toDateString() === selectedDate.toDateString()}
            onSelect={() => onDateSelect(day.date)}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
