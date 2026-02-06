import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useTodoStore } from '../../store/todoStore';
import { Priority, Category } from '../../types/todo.types';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
    const { addTask } = useTodoStore();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');
    const [category, setCategory] = useState<Category>('today');
    const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split('T')[0]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Task title is required');
            return;
        }

        try {
            addTask({
                title,
                description,
                priority,
                category,
                dueDate: new Date(dueDate),
                completed: false,
                tags: [],
                subtasks: [],
                dependencies: []
            });

            toast.success('Task created successfully!');

            // Reset form
            setTitle('');
            setDescription('');
            setPriority('medium');
            setCategory('today');
            setDueDate(new Date().toISOString().split('T')[0]);

            onClose();
        } catch (error) {
            toast.error('Failed to create task');
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-white dark:bg-dark-surface rounded-2xl shadow-xl overflow-hidden animate-slide-up">
                <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/5">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-ivory">New Task</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-ivory rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-5">
                        {/* Title */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-bold text-gray-700 dark:text-ivory/80">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="What needs to be done?"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-ivory placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                autoFocus
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-bold text-gray-700 dark:text-ivory/80">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add details..."
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-ivory placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Date */}
                            <div className="space-y-2">
                                <label htmlFor="date" className="text-sm font-bold text-gray-700 dark:text-ivory/80">
                                    Due Date
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-ivory focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                />
                            </div>

                            {/* Priority */}
                            <div className="space-y-2">
                                <label htmlFor="priority" className="text-sm font-bold text-gray-700 dark:text-ivory/80">
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value as Priority)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-ivory focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-ivory/80">
                                Category
                            </label>
                            <div className="flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
                                {(['today', 'secondary'] as Category[]).map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${category === cat
                                                ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm'
                                                : 'text-gray-500 dark:text-ivory/50 hover:text-gray-700 dark:hover:text-ivory'
                                            }`}
                                    >
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-95 transition-all"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;
