import React, { useState } from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import CalendarView from '../components/calendar/CalendarView';
import CalendarTasks from '../components/calendar/CalendarTasks';
import { useTodoStore } from '../store/todoStore';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { tasks } = useTodoStore();

  const tasksForDate = tasks.filter(task => {
    if (!task.dueDate) return false;
    const dueDate = task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);
    return dueDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="min-h-screen bg-white dark:bg-dark-charcoal">
      <Header />

      <main className="max-w-lg mx-auto pb-32">
        <CalendarView
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          tasks={tasks}
        />

        <CalendarTasks
          date={selectedDate}
          tasks={tasksForDate}
        />

        {/* Weekly Summary Card */}
        <div className="m-4 p-4 rounded-xl bg-white dark:bg-dark-surface border border-calendar-grid dark:border-dark-calendar-grid shadow-sm flex gap-4 items-start">
          <div className="bg-calendar-warm dark:bg-dark-charcoal p-2 rounded-lg text-calendar-green dark:text-dark-calendar-green border border-calendar-grid dark:border-dark-calendar-grid">
            <span className="material-symbols-outlined text-2xl">insights</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-calendar-cocoa dark:text-dark-light-cream">
              Weekly Summary
            </h4>
            <p className="text-xs text-calendar-sepia dark:text-dark-muted-cream leading-relaxed mt-1">
              You've completed 85% of your scheduled tasks this week.
              Your peak productivity is usually between 9 AM and 11 AM.
            </p>
          </div>
        </div>
      </main>

      import {toast} from 'react-hot-toast';

      // ... (top of file changes to import toast)

      {/* Add Task FAB */}
      <button
        onClick={() => toast('Event creation coming soon!', { icon: '📅' })}
        className="fixed bottom-24 right-6 size-14 bg-calendar-yellow dark:bg-dark-calendar-yellow text-calendar-cocoa dark:text-dark-calendar-charcoal rounded-full shadow-lg shadow-calendar-yellow/20 dark:shadow-dark-calendar-yellow/20 flex items-center justify-center active:scale-95 transition-transform z-50"
      >
        <span className="material-symbols-outlined text-2xl font-bold">add</span>
      </button>

      <BottomNav />
    </div>
  );
};

export default CalendarPage;