import React, { useState } from 'react';
import { Task, Priority } from '../../types/todo.types';

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
  onSubmit: (taskData: Partial<Task>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose, onSubmit }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<Priority>(task?.priority || 'medium');
  const [dueDate, setDueDate] = useState<string>(
    task?.dueDate ? (task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate)).toISOString().split('T')[0] : ''
  );
  const [list, setList] = useState(task?.tags?.[0] || 'Work');
  const [hasReminder, setHasReminder] = useState(false);
  const [recurrence, setRecurrence] = useState<string>('none');
  const [subtasks, setSubtasks] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Partial<Task> = {
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: [list],
      recurrence: recurrence !== 'none' ? recurrence as any : undefined,
      subtasks: subtasks.map((sub, idx) => ({
        id: `${Date.now()}-${idx}`,
        title: sub,
        completed: false,
      })),
    };

    onSubmit(taskData);
    onClose();
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const updateSubtask = (index: number, value: string) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = value;
    setSubtasks(newSubtasks);
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-surface-cream dark:bg-dark-form-deep-chocolate">
      <header className="sticky top-0 z-50 bg-surface-cream/80 dark:bg-dark-form-deep-chocolate/90 backdrop-blur-xl border-b border-border-sepia dark:border-dark-form-border/50">
        <div className="flex items-center justify-between px-4 h-14 max-w-md mx-auto">
          <button 
            onClick={onClose}
            className="text-stem-green dark:text-dark-form-stem-green text-[17px] font-normal"
          >
            Cancel
          </button>
          <h1 className="text-[17px] font-bold text-deep-chocolate dark:text-text-light">
            {task ? 'Edit Task' : 'New Task'}
          </h1>
          <button 
            onClick={handleSubmit}
            className="text-stem-green dark:text-dark-form-yellow text-[17px] font-semibold"
          >
            Done
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-32">
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Title */}
          <section className="space-y-4">
            <div className="space-y-1">
              <label className="px-1 text-[13px] font-bold text-text-secondary dark:text-text-muted uppercase tracking-tight">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task name"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-form-surface border border-border-sepia dark:border-dark-form-border focus:ring-2 focus:ring-golden-yellow dark:focus:ring-dark-form-yellow focus:border-golden-yellow dark:focus:border-dark-form-yellow text-[17px] placeholder:text-text-secondary/40 dark:placeholder:text-text-muted/40 text-deep-chocolate dark:text-text-light outline-none transition-all"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="px-1 text-[13px] font-bold text-text-secondary dark:text-text-muted uppercase tracking-tight">
                Notes
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-form-surface border border-border-sepia dark:border-dark-form-border focus:ring-2 focus:ring-golden-yellow dark:focus:ring-dark-form-yellow focus:border-golden-yellow dark:focus:border-dark-form-yellow text-[17px] placeholder:text-text-secondary/40 dark:placeholder:text-text-muted/40 text-deep-chocolate dark:text-text-light resize-none outline-none transition-all"
              />
            </div>
          </section>

          {/* Priority */}
          <section className="space-y-4">
            <div className="space-y-3">
              <label className="px-1 text-[13px] font-bold text-text-secondary dark:text-text-muted uppercase tracking-tight">
                Priority
              </label>
              <div className="flex gap-2">
                {(['none', 'low', 'medium', 'high'] as const).map((p) => (
                  <label key={p} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === (p === 'none' ? 'medium' : p)}
                      onChange={() => setPriority(p === 'none' ? 'medium' : p)}
                      className="sr-only peer"
                    />
                    <div className="py-2.5 text-center rounded-lg border border-border-sepia dark:border-dark-form-border bg-white dark:bg-dark-form-surface peer-checked:bg-sun-amber-light dark:peer-checked:bg-dark-form-border peer-checked:text-amber-800 dark:peer-checked:text-text-muted peer-checked:border-sun-amber dark:peer-checked:border-text-muted text-deep-chocolate dark:text-text-muted font-medium text-sm transition-all">
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* List & Date */}
            <div className="bg-white dark:bg-dark-form-surface border border-border-sepia dark:border-dark-form-border rounded-xl divide-y divide-border-sepia/50 dark:divide-dark-form-border/40">
              {/* List Selection */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-stem-green dark:text-dark-form-stem-green">
                    list_alt
                  </span>
                  <span className="text-[17px] font-medium text-deep-chocolate dark:text-text-light">
                    List
                  </span>
                </div>
                <select
                  value={list}
                  onChange={(e) => setList(e.target.value)}
                  className="bg-transparent border-none text-[17px] text-stem-green dark:text-dark-form-stem-green font-medium focus:ring-0 py-0 pr-8 text-right appearance-none cursor-pointer"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Garden">Garden</option>
                </select>
              </div>

              {/* Date Selection */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sun-amber dark:text-dark-form-amber">
                    calendar_today
                  </span>
                  <span className="text-[17px] font-medium text-deep-chocolate dark:text-text-light">
                    Date
                  </span>
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-transparent border-none text-[17px] text-stem-green dark:text-dark-form-stem-green font-medium focus:ring-0 py-0 text-right"
                />
              </div>
            </div>
          </section>

          {/* Reminder & Repeat */}
          <section className="bg-white dark:bg-dark-form-surface border border-border-sepia dark:border-dark-form-border rounded-xl divide-y divide-border-sepia/50 dark:divide-dark-form-border/40">
            {/* Reminder Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-golden-yellow dark:bg-dark-form-yellow flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined text-deep-chocolate dark:text-dark-form-deep-chocolate text-[20px] font-bold">
                    notifications
                  </span>
                </div>
                <span className="text-[17px] font-medium text-deep-chocolate dark:text-text-light">
                  Reminder
                </span>
              </div>
              <div className="relative inline-block w-[51px] h-[31px]">
                <input
                  type="checkbox"
                  id="remind-toggle"
                  checked={hasReminder}
                  onChange={(e) => setHasReminder(e.target.checked)}
                  className="ios-toggle sr-only"
                />
                <label
                  htmlFor="remind-toggle"
                  className="ios-toggle-label absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-border-sepia/50 dark:bg-dark-form-border/50 transition-colors rounded-full"
                ></label>
              </div>
            </div>

            {/* Repeat */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stem-green dark:bg-dark-form-leaf-green flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]">repeat</span>
                </div>
                <span className="text-[17px] font-medium text-deep-chocolate dark:text-text-light">
                  Repeat
                </span>
              </div>
              <select
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
                className="bg-transparent border-none text-[17px] text-text-secondary dark:text-text-muted font-medium focus:ring-0 py-0 pr-8 text-right"
              >
                <option value="none">Never</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </section>

          {/* Subtasks */}
          <section className="space-y-3">
            <label className="px-1 text-[13px] font-bold text-text-secondary dark:text-text-muted uppercase tracking-tight">
              Subtasks
            </label>
            <button
              type="button"
              onClick={addSubtask}
              className="w-full flex items-center gap-3 p-4 bg-white dark:bg-dark-form-surface border border-border-sepia dark:border-dark-form-border rounded-xl text-stem-green dark:text-dark-form-stem-green font-bold active:bg-leaf-green-pale dark:active:bg-dark-form-dim-green transition-colors"
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Add Subtask</span>
            </button>
            
            {subtasks.map((subtask, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={subtask}
                  onChange={(e) => updateSubtask(index, e.target.value)}
                  placeholder={`Subtask ${index + 1}`}
                  className="flex-1 px-3 py-2 rounded-lg border border-border-sepia dark:border-dark-form-border bg-white dark:bg-dark-form-surface"
                />
                <button
                  type="button"
                  onClick={() => removeSubtask(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ))}
          </section>
        </form>
      </main>

      {/* Create Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface-cream/80 dark:bg-gradient-to-t dark:from-dark-form-deep-chocolate dark:via-dark-form-deep-chocolate dark:to-transparent backdrop-blur-sm">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-golden-yellow dark:bg-dark-form-yellow text-deep-chocolate dark:text-dark-form-deep-chocolate font-bold py-4 rounded-2xl active:bg-golden-yellow-dark dark:active:bg-dark-form-dark-yellow transition-all shadow-xl shadow-golden-yellow/30 dark:shadow-dark-form-yellow/10 text-lg"
          >
            {task ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;