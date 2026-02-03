import { Task } from '../types/todo.types';

export interface AnalyticsMetrics {
  efficiency: number;
  completionRate: number;
  averageCompletionTime: number;
  peakProductivityHours: string[];
  taskDistribution: {
    category: string;
    count: number;
    percentage: number;
  }[];
  trends: {
    weekOverWeek: number;
    monthOverMonth: number;
  };
}

export const calculateAnalytics = (tasks: Task[]): AnalyticsMetrics => {
  const completedTasks = tasks.filter(t => t.completed);
  // const _pendingTasks = tasks.filter(t => !t.completed);
  
  // Efficiency score (0-100)
  const efficiency = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;
  
  // Completion rate (tasks completed on time)
  let onTimeCompletion = 0;
  completedTasks.forEach(task => {
    if (task.dueDate) {
      const dueDate = task.dueDate instanceof Date ? task.dueDate : new Date(task.dueDate);
      const completedDate = task.updatedAt instanceof Date ? task.updatedAt : new Date(task.updatedAt);
      if (completedDate <= dueDate) {
        onTimeCompletion++;
      }
    }
  });
  
  const completionRate = completedTasks.length > 0 
    ? Math.round((onTimeCompletion / completedTasks.length) * 100) 
    : 0;
  
  // Task distribution by category
  const categories = ['today', 'secondary', 'upcoming'];
  const taskDistribution = categories.map(category => {
    const categoryTasks = tasks.filter(t => t.category === category);
    return {
      category,
      count: categoryTasks.length,
      percentage: tasks.length > 0 ? Math.round((categoryTasks.length / tasks.length) * 100) : 0,
    };
  });
  
  // Mock data for demo purposes
  const peakProductivityHours = ['09:00', '14:00', '16:00'];
  const averageCompletionTime = 2.5; // hours
  const trends = {
    weekOverWeek: Math.floor(Math.random() * 20) - 5,
    monthOverMonth: Math.floor(Math.random() * 30) - 10,
  };
  
  return {
    efficiency,
    completionRate,
    averageCompletionTime,
    peakProductivityHours,
    taskDistribution,
    trends,
  };
};

// Calculate focus distribution
export const calculateFocusDistribution = (tasks: Task[]) => {
  const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
  const mediumPriority = tasks.filter(t => t.priority === 'medium' && !t.completed).length;
  const lowPriority = tasks.filter(t => t.priority === 'low' && !t.completed).length;
  
  const total = highPriority + mediumPriority + lowPriority;
  
  return {
    deepWork: total > 0 ? Math.round((highPriority / total) * 100) : 60,
    mediumFocus: total > 0 ? Math.round((mediumPriority / total) * 100) : 25,
    lowFocus: total > 0 ? Math.round((lowPriority / total) * 100) : 15,
  };
};

// Generate velocity data
export const generateVelocityData = () => {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  return days.map(day => ({
    day,
    planned: Math.floor(Math.random() * 20) + 40,
    completed: Math.floor(Math.random() * 15) + 30,
  }));
};