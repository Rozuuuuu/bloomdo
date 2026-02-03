import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, FilterType, Priority } from '../types/todo.types';

interface TodoState {
  tasks: Task[];
  activeFilter: FilterType;
  selectedTaskId: string | null;
  searchQuery: string;
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  setFilter: (filter: FilterType) => void;
  setSelectedTask: (taskId: string | null) => void;
  setSearchQuery: (query: string) => void;
  
  // Computed/derived state
  filteredTasks: () => Task[];
  todayTasks: () => Task[];
  getTaskById: (taskId: string) => Task | undefined;
  getTaskStats: () => {
    total: number;
    completed: number;
    pending: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
  };
  searchTasks: (query: string) => Task[];
}

// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);

// Ensure proper date handling
const ensureDate = (date: Date | string | undefined): Date | undefined => {
  if (!date) return undefined;
  return date instanceof Date ? date : new Date(date);
};

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: '1',
          title: 'Finalize Brand Strategy',
          description: 'Complete the brand strategy document for Q4 launch',
          completed: true,
          priority: 'high' as Priority,
          dueDate: new Date('2024-12-01T09:00:00'),
          category: 'today',
          subtasks: [
            { id: '1-1', title: 'Research competitors', completed: true },
            { id: '1-2', title: 'Define brand values', completed: true },
            { id: '1-3', title: 'Create mood board', completed: false },
            { id: '1-4', title: 'Write positioning statement', completed: false },
          ],
          tags: ['branding', 'strategy', 'marketing'],
          createdAt: new Date('2024-11-25'),
          updatedAt: new Date('2024-11-30'),
          dependencies: [],
        },
        {
          id: '2',
          title: 'Sync with Operations',
          description: 'Weekly sync meeting with operations team about inventory',
          completed: false,
          priority: 'medium' as Priority,
          recurrence: 'weekly',
          category: 'today',
          dueDate: new Date('2024-12-05T14:30:00'),
          dependencies: ['1'],
          createdAt: new Date('2024-11-28'),
          updatedAt: new Date('2024-11-28'),
          subtasks: [],
          tags: ['meeting', 'operations'],
        },
        {
          id: '3',
          title: 'Review Documentation',
          description: 'Review API documentation for new microservices',
          completed: false,
          priority: 'low' as Priority,
          dueDate: new Date('2024-12-02T11:00:00'),
          category: 'today',
          createdAt: new Date('2024-11-29'),
          updatedAt: new Date('2024-11-29'),
          subtasks: [],
          tags: ['documentation', 'api'],
        },
        {
          id: '4',
          title: 'Internal Audit Prep',
          description: 'Prepare documents for internal financial audit',
          completed: false,
          priority: 'low' as Priority,
          recurrence: 'monthly',
          category: 'secondary',
          dueDate: new Date('2024-12-15T09:00:00'),
          createdAt: new Date('2024-11-27'),
          updatedAt: new Date('2024-11-27'),
          subtasks: [],
          tags: ['finance', 'audit'],
        },
        {
          id: '5',
          title: 'Client Strategy Meeting',
          description: 'Quarterly strategy meeting with key clients',
          completed: false,
          priority: 'high' as Priority,
          dueDate: new Date('2024-12-05T09:30:00'),
          category: 'today',
          createdAt: new Date('2024-11-30'),
          updatedAt: new Date('2024-11-30'),
          subtasks: [
            { id: '5-1', title: 'Prepare presentation', completed: true },
            { id: '5-2', title: 'Review client data', completed: false },
            { id: '5-3', title: 'Schedule follow-up', completed: false },
          ],
          tags: ['client', 'meeting'],
        },
        {
          id: '6',
          title: 'Team Sync: Project Phoenix',
          description: 'Weekly team sync for the Project Phoenix initiative',
          completed: false,
          priority: 'medium' as Priority,
          recurrence: 'weekly',
          category: 'secondary',
          dueDate: new Date('2024-12-06T11:00:00'),
          createdAt: new Date('2024-11-28'),
          updatedAt: new Date('2024-11-28'),
          subtasks: [],
          tags: ['team', 'sync'],
        },
        {
          id: '7',
          title: 'Quarterly Budget Review',
          description: 'Review and adjust Q4 budget allocations',
          completed: true,
          priority: 'medium' as Priority,
          recurrence: 'monthly',
          category: 'secondary',
          dueDate: new Date('2024-11-30T08:00:00'),
          createdAt: new Date('2024-11-20'),
          updatedAt: new Date('2024-11-30'),
          subtasks: [],
          tags: ['budget', 'finance'],
        },
      ],
      activeFilter: 'all',
      selectedTaskId: null,
      searchQuery: '',

      // Add Task
      addTask: (taskData) => {
        const id = generateId();
        const now = new Date();
        
        const newTask: Task = {
          ...taskData,
          id,
          createdAt: now,
          updatedAt: now,
          // Ensure dates are properly handled
          dueDate: taskData.dueDate ? ensureDate(taskData.dueDate) : undefined,
          // Ensure subtasks have proper IDs
          subtasks: taskData.subtasks?.map((subtask, index) => ({
            ...subtask,
            id: `${id}-${index}`,
          })),
          // Ensure proper types
          completed: taskData.completed || false,
          priority: taskData.priority || 'medium',
          dependencies: taskData.dependencies || [],
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));

        return id;
      },

      // Update Task
      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId) {
              const updatedTask = {
                ...task,
                ...updates,
                updatedAt: new Date(),
                // Handle date updates
                dueDate: updates.dueDate !== undefined 
                  ? ensureDate(updates.dueDate) 
                  : task.dueDate,
              };
              
              // Update subtasks if provided
              if (updates.subtasks !== undefined) {
                updatedTask.subtasks = updates.subtasks.map((subtask, index) => ({
                  ...subtask,
                  id: subtask.id || `${taskId}-${index}`,
                }));
              }
              
              return updatedTask;
            }
            return task;
          }),
        }));
      },

      // Delete Task
      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
          // Clear selected task if it was deleted
          selectedTaskId: state.selectedTaskId === taskId ? null : state.selectedTaskId,
        }));
      },

      // Toggle Task Completion
      toggleTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { 
                  ...task, 
                  completed: !task.completed,
                  updatedAt: new Date(),
                }
              : task
          ),
        }));
      },

      // Toggle Subtask Completion
      toggleSubtask: (taskId, subtaskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === taskId && task.subtasks) {
              const updatedSubtasks = task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              );
              
              // Check if all subtasks are completed
              const allSubtasksCompleted = updatedSubtasks.every(s => s.completed);
              
              return {
                ...task,
                subtasks: updatedSubtasks,
                completed: allSubtasksCompleted ? true : task.completed,
                updatedAt: new Date(),
              };
            }
            return task;
          }),
        }));
      },

      // Set Filter
      setFilter: (filter) => {
        set({ activeFilter: filter });
      },

      // Set Selected Task
      setSelectedTask: (taskId) => {
        set({ selectedTaskId: taskId });
      },

      // Set Search Query
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      // Filtered Tasks
      filteredTasks: () => {
        const { tasks, activeFilter, searchQuery } = get();
        
        let filtered = tasks;
        
        // Apply search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(task =>
            task.title.toLowerCase().includes(query) ||
            task.description?.toLowerCase().includes(query) ||
            task.tags?.some(tag => tag.toLowerCase().includes(query))
          );
        }
        
        // Apply category filter
        switch (activeFilter) {
          case 'focused':
            return filtered.filter((task) => task.priority === 'high' && !task.completed);
          case 'shared':
            return filtered.filter((task) => task.dependencies && task.dependencies.length > 0);
          case 'archives':
            return filtered.filter((task) => task.completed);
          case 'today':
            return filtered.filter((task) => task.category === 'today');
          case 'all':
          default:
            return filtered;
        }
      },

      // Today's Tasks
      todayTasks: () => {
        const { tasks } = get();
        return tasks.filter((task) => task.category === 'today');
      },

      // Get Task by ID
      getTaskById: (taskId) => {
        const { tasks } = get();
        const task = tasks.find((task) => task.id === taskId);
        
        if (task) {
          // Ensure dates are Date objects
          return {
            ...task,
            dueDate: ensureDate(task.dueDate),
            createdAt: ensureDate(task.createdAt) || new Date(),
            updatedAt: ensureDate(task.updatedAt) || new Date(),
          };
        }
        
        return undefined;
      },

      // Get Task Statistics
      getTaskStats: () => {
        const { tasks } = get();
        return {
          total: tasks.length,
          completed: tasks.filter((t) => t.completed).length,
          pending: tasks.filter((t) => !t.completed).length,
          highPriority: tasks.filter((t) => t.priority === 'high' && !t.completed).length,
          mediumPriority: tasks.filter((t) => t.priority === 'medium' && !t.completed).length,
          lowPriority: tasks.filter((t) => t.priority === 'low' && !t.completed).length,
        };
      },

      // Search Tasks
      searchTasks: (query) => {
        const { tasks } = get();
        if (!query.trim()) return tasks;
        
        const searchTerm = query.toLowerCase();
        return tasks.filter(task =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.description?.toLowerCase().includes(searchTerm) ||
          task.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      },
    }),
    {
      name: 'todo-storage',
      // Only persist tasks to localStorage
      partialize: (state) => ({ 
        tasks: state.tasks.map(task => ({
          ...task,
          // Convert dates to ISO strings for serialization
          dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate,
          createdAt: task.createdAt instanceof Date ? task.createdAt.toISOString() : task.createdAt,
          updatedAt: task.updatedAt instanceof Date ? task.updatedAt.toISOString() : task.updatedAt,
        })),
      }),
      // Convert dates back from strings on rehydration
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.tasks = state.tasks.map(task => ({
            ...task,
            // Convert ISO strings back to Date objects
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
        }
      },
    }
  )
);

// Utility functions for task management
export const todoUtils = {
  // Get tasks by date range
  getTasksByDateRange: (tasks: Task[], startDate: Date, endDate: Date): Task[] => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const dueDate = ensureDate(task.dueDate);
      if (!dueDate) return false;
      
      return dueDate >= startDate && dueDate <= endDate;
    });
  },

  // Get upcoming tasks (next 7 days)
  getUpcomingTasks: (tasks: Task[]): Task[] => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    return tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const dueDate = ensureDate(task.dueDate);
      if (!dueDate) return false;
      
      return dueDate >= today && dueDate <= nextWeek;
    });
  },

  // Get overdue tasks
  getOverdueTasks: (tasks: Task[]): Task[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const dueDate = ensureDate(task.dueDate);
      if (!dueDate) return false;
      
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    });
  },

  // Calculate task completion percentage
  getCompletionPercentage: (task: Task): number => {
    if (!task.subtasks || task.subtasks.length === 0) {
      return task.completed ? 100 : 0;
    }
    
    const completedSubtasks = task.subtasks.filter(s => s.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
  },

  // Sort tasks by priority
  sortTasksByPriority: (tasks: Task[]): Task[] => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1; // Incomplete tasks first
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  },
  // Add to your existing todoUtils object
  getDueDateStatus: (task: Task): string => {
    if (!task.dueDate) return 'no-date';
    
    const dueDate = ensureDate(task.dueDate);
    if (!dueDate) return 'no-date';
    
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
    }, 
  // Sort tasks by due date
  sortTasksByDueDate: (tasks: Task[]): Task[] => {
    return [...tasks].sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      
      const dateA = ensureDate(a.dueDate) || new Date(0);
      const dateB = ensureDate(b.dueDate) || new Date(0);
      
      return dateA.getTime() - dateB.getTime();
    });
  },

  // Get tasks for calendar view
  getTasksForCalendar: (tasks: Task[], month: number, year: number): Record<string, Task[]> => {
    const result: Record<string, Task[]> = {};
    
    tasks.forEach(task => {
      if (!task.dueDate) return;
      
      const dueDate = ensureDate(task.dueDate);
      if (!dueDate) return;
      
      if (dueDate.getMonth() === month && dueDate.getFullYear() === year) {
        const dateKey = dueDate.toISOString().split('T')[0];
        if (!result[dateKey]) {
          result[dateKey] = [];
        }
        result[dateKey].push(task);
      }
    });
    
    return result;
  },
};