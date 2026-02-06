import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import TaskCard from '../components/tasks/TaskCard';
import AISuggestionCard from '../components/tasks/AISuggestionCard';
import FilterTabs from '../components/tasks/FilterTabs';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import AddTaskModal from '../components/tasks/AddTaskModal';
import { useTodoStore } from '../store/todoStore';
import { FilterType } from '../types/todo.types';

const DashboardPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const navigate = useNavigate();

  const {
    todayTasks,
    filteredTasks,
    toggleTask,
    getTaskStats,
  } = useTodoStore();

  const tasks = filteredTasks();
  const stats = getTaskStats();
  const secondaryTasks = tasks.filter(task => task.category === 'secondary');

  const handleTaskToggle = (taskId: string) => {
    toggleTask(taskId);
  };

  const handleAddTask = () => {
    setIsAddTaskOpen(true);
  };

  const handleStartFocus = () => {
    navigate('/focus-mode');
  };

  return (
    <div className="min-h-screen bg-off-white dark:bg-background-dark transition-colors duration-200">
      <Header />
      <main className="max-w-lg mx-auto pb-32">
        <AISuggestionCard
          title="Focus Session"
          description='Deep work on "Project Bloom"'
          actionText="Start"
          onAction={handleStartFocus}
        />

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Stats Summary (optional) */}
        <div className="px-5 py-2 text-xs text-chocolate-brown/50 dark:text-ivory/50">
          <span className="font-medium">{stats.completed} of {stats.total} tasks completed</span>
          {stats.highPriority > 0 && (
            <span className="ml-3">
              • <span className="text-priority-high">{stats.highPriority} high priority</span>
            </span>
          )}
        </div>

        {/* Today's Tasks Section */}
        <section className="mt-4">
          <div className="flex items-center justify-between px-5 py-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-chocolate-brown/50 dark:text-ivory/50">
              Today
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-border-warm/40 dark:bg-white/10 text-chocolate-brown dark:text-ivory border border-border-warm dark:border-white/10">
              {todayTasks().length} TASKS
            </span>
          </div>

          {todayTasks().map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleTaskToggle}
            />
          ))}
        </section>

        {/* Secondary Tasks Section */}
        <section className="mt-6">
          <div className="flex items-center justify-between px-5 py-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-chocolate-brown/50 dark:text-ivory/50">
              Secondary
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-border-warm/40 dark:bg-white/10 text-chocolate-brown dark:text-ivory border border-border-warm dark:border-white/10">
              {secondaryTasks.length} TASK{secondaryTasks.length !== 1 ? 'S' : ''}
            </span>
          </div>

          {secondaryTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleTaskToggle}
            />
          ))}
        </section>
      </main>

      <FloatingActionButton
        onClick={handleAddTask}
        icon="add"
        tooltip="Add new task"
      />

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
      />

      <BottomNav />
    </div >
  );
};

export default DashboardPage;
