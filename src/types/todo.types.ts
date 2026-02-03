export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type FilterType = 'all' | 'today' | 'focused' | 'shared' | 'archives';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date | string;
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  subtasks?: Subtask[];
  tags?: string[];
  category?: 'today' | 'secondary' | 'upcoming' | 'completed';
  createdAt: Date | string;
  updatedAt: Date | string;
  dependencies?: string[];
}

// Calendar types
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  tasks: Task[];
  isToday?: boolean;
  isSelected?: boolean;
}

// Dependency map types
export interface DependencyNode {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'locked' | 'scheduled';
  position: { x: number; y: number };
  dependencies?: string[];
}

// Task form types
export interface TaskFormData {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date | string;
  list?: string;
  hasReminder?: boolean;
  recurrence?: string;
  subtasks?: Array<{ title: string; completed: boolean }>;
  tags?: string[];
  dependencies?: string[];
}