import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodoStore } from '../store/todoStore';
import { todoUtils } from '../store/todoStore';

interface AnalyticsData {
  efficiencyScore: number;
  completedTasks: number;
  focusTime: number;
  velocityData: {
    day: string;
    planned: number;
    completed: number;
  }[];
  focusDistribution: {
    category: string;
    value: number;
    color: string;
    description: string;
  }[];
  weeklyMomentum: number;
  totalTasksCompleted: number;
  trends: {
    completedChange: number;
    focusTimeChange: number;
  };
}

import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';

const StatsPage: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, getTaskStats } = useTodoStore();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  // Calculate analytics data
  useEffect(() => {
    const stats = getTaskStats();

    // Calculate efficiency score (0-100%)
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const efficiencyScore = totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    // Generate velocity data for last 5 days
    const velocityData = ['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day) => ({
      day,
      planned: Math.floor(Math.random() * 20) + 40,
      completed: Math.floor(Math.random() * 15) + 30,
    }));
    // Focus distribution
    const focusDistribution = [
      {
        category: 'Deep Work',
        value: 60,
        color: 'primary',
        description: 'Focused individual tasks'
      },
      {
        category: 'Meetings',
        value: 25,
        color: 'accent-amber',
        description: 'Team syncs and reviews'
      },
      {
        category: 'Learning',
        value: 15,
        color: 'accent-green',
        description: 'Research and skill development'
      },
    ];

    // Get upcoming tasks for momentum calculation
    const upcomingTasks = todoUtils.getUpcomingTasks(tasks);
    const weeklyMomentum = Math.min(Math.floor((upcomingTasks.length / 50) * 100), 100);

    const data: AnalyticsData = {
      efficiencyScore,
      completedTasks: stats.completed,
      focusTime: 32,
      velocityData, // Now this is defined
      focusDistribution,
      weeklyMomentum,
      totalTasksCompleted: stats.completed,
      trends: {
        completedChange: Math.floor(Math.random() * 20) - 5,
        focusTimeChange: Math.floor(Math.random() * 10) - 5,
      },
    };

    setAnalyticsData(data);
  }, [tasks, timeframe]); // Removed getTaskStats to avoid potential infinite loops

  const handleShare = () => {
    // In a real app, implement sharing functionality
    console.log('Share analytics');
    if (navigator.share) {
      navigator.share({
        title: 'My Productivity Analytics',
        text: `My current efficiency score is ${analyticsData?.efficiencyScore}%! Check out BloomDo for task management.`,
        url: window.location.href,
      });
    }
  };

  const handleTimeframeChange = (newTimeframe: 'week' | 'month' | 'year') => {
    setTimeframe(newTimeframe);
  };

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500 dark:text-[#bab29c]">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Calculate circle stroke properties for efficiency score
  const circleCircumference = 2 * Math.PI * 88;
  const strokeDashoffset = circleCircumference - (analyticsData.efficiencyScore / 100) * circleCircumference;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white pb-20">
      <Header />

      <main className="max-w-lg mx-auto w-full">

        {/* Segmented Control */}
        <div className="flex px-4 py-3">
          <div className="flex h-11 flex-1 items-center justify-center rounded-xl bg-slate-200 dark:bg-surface-dark p-1">
            {(['week', 'month', 'year'] as const).map((period) => (
              <label
                key={period}
                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-slate-500 dark:text-[#bab29c] text-sm font-bold leading-normal transition-all ${timeframe === period
                  ? 'bg-white dark:bg-background-dark shadow-sm text-primary'
                  : 'hover:bg-white/50 dark:hover:bg-background-dark/50'
                  }`}
              >
                <span className="truncate capitalize">{period}</span>
                <input
                  className="invisible w-0"
                  name="timeframe"
                  type="radio"
                  value={period}
                  checked={timeframe === period}
                  onChange={() => handleTimeframeChange(period)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Hero Metric: Efficiency Score */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative flex items-center justify-center size-48">
            {/* SVG Circle Background */}
            <svg className="absolute size-full transform -rotate-90">
              <circle
                className="text-slate-200 dark:text-surface-dark"
                cx="96"
                cy="96"
                fill="transparent"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
              />
              <circle
                className="text-primary glow-ring"
                cx="96"
                cy="96"
                fill="transparent"
                r="88"
                stroke="currentColor"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="12"
              />
            </svg>

            <div className="flex flex-col items-center z-10">
              <span className="text-5xl font-extrabold text-slate-900 dark:text-white">
                {analyticsData.efficiencyScore}%
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-[#bab29c] mt-1">
                Efficiency
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 bg-accent-green/10 px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-accent-green text-sm">trending_up</span>
            <p className="text-accent-green text-sm font-bold">
              +5.2% from last {timeframe}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-4 px-4 pb-4">
          <div className="flex min-w-[150px] flex-1 flex-col gap-1 rounded-2xl p-5 bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/5">
            <p className="text-slate-500 dark:text-[#bab29c] text-xs font-bold uppercase tracking-wider">
              Completed
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
                {analyticsData.completedTasks}
              </p>
              <p className={`text-xs font-bold ${analyticsData.trends.completedChange >= 0 ? 'text-accent-green' : 'text-red-500'
                }`}>
                {analyticsData.trends.completedChange >= 0 ? '+' : ''}{analyticsData.trends.completedChange}
              </p>
            </div>
          </div>

          <div className="flex min-w-[150px] flex-1 flex-col gap-1 rounded-2xl p-5 bg-slate-100 dark:bg-surface-dark border border-slate-200 dark:border-white/5">
            <p className="text-slate-500 dark:text-[#bab29c] text-xs font-bold uppercase tracking-wider">
              Focus Time
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">
                {analyticsData.focusTime}h
              </p>
              <p className={`text-xs font-bold ${analyticsData.trends.focusTimeChange >= 0 ? 'text-primary' : 'text-red-500'
                }`}>
                {analyticsData.trends.focusTimeChange >= 0 ? '+' : ''}{analyticsData.trends.focusTimeChange}h
              </p>
            </div>
          </div>
        </div>

        {/* Task Completion Bar Chart */}
        <div className="px-4 py-2">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-surface-dark p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
                  Task Velocity
                </h3>
                <p className="text-slate-500 dark:text-[#bab29c] text-sm">
                  Planned vs Completed
                </p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="size-2 rounded-full bg-primary"></span>
                  Done
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="size-2 rounded-full bg-slate-400"></span>
                  Plan
                </div>
              </div>
            </div>

            <div className="grid h-48 grid-cols-5 gap-4 items-end justify-items-center pt-4">
            </div>
          </div>
        </div>

        {/* Focus Distribution Section */}
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-6">
          Focus Distribution
        </h3>

        <div className="px-4 py-2">
          <div className="flex items-center gap-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-surface-dark p-6">
            {/* Pie Chart */}
            <div className="relative size-24 shrink-0">
              <svg className="size-full" viewBox="0 0 36 36">
                {analyticsData.focusDistribution.map((item, index) => {
                  const previousTotal = analyticsData.focusDistribution
                    .slice(0, index)
                    .reduce((sum, i) => sum + i.value, 0);

                  const dashArray = `${item.value}, 100`;
                  const dashOffset = `-${previousTotal}`;

                  return (
                    <path
                      key={item.category}
                      className={`text-${item.color}`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={dashArray}
                      strokeDashoffset={dashOffset}
                      strokeWidth="6"
                    />
                  );
                })}
              </svg>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              {analyticsData.focusDistribution.map((item) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full bg-${item.color}`}></span>
                    <div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {item.category}
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-[#bab29c]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Momentum Section */}
        <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-6">
          Weekly Momentum
        </h3>

        <div className="px-4 py-2">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-surface-dark p-6">
            <div className="flex flex-col gap-1">
              <p className="text-primary tracking-light text-[32px] font-bold leading-tight">
                {analyticsData.totalTasksCompleted} Tasks
              </p>
              <p className="text-slate-500 dark:text-[#bab29c] text-sm font-medium">
                Finished this period
              </p>
            </div>

            {/* Line Graph */}
            <div className="relative h-32 w-full mt-4 flex items-end">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#f4c025" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f4c025" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Area */}
                <path
                  d="M0 100 L0 70 Q25 50 50 80 T100 20 L100 100 Z"
                  fill="url(#gradient)"
                />

                {/* Line */}
                <path
                  d="M0 70 Q25 50 50 80 T100 20"
                  fill="none"
                  stroke="#f4c025"
                  strokeLinecap="round"
                  strokeWidth="3"
                />

                {/* Dots */}
                <circle cx="0" cy="70" fill="#f4c025" r="3" />
                <circle cx="50" cy="80" fill="#f4c025" r="3" />
                <circle cx="100" cy="20" fill="#f4c025" r="3" />
              </svg>
            </div>

            <div className="flex justify-between w-full px-1">
              {['MON', 'WED', 'FRI', 'SUN'].map((day) => (
                <p key={day} className="text-slate-500 dark:text-[#bab29c] text-[10px] font-bold">
                  {day}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="px-4 py-6">
          <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-surface-dark p-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Performance Insights
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    speed
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Average Completion Rate
                    </p>
                    <p className="text-xs text-slate-500 dark:text-[#bab29c]">
                      Tasks completed on time
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">
                  {analyticsData.efficiencyScore}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-green">
                    trending_up
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Productivity Trend
                    </p>
                    <p className="text-xs text-slate-500 dark:text-[#bab29c]">
                      Compared to last {timeframe}
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-accent-green">
                  +{Math.floor(Math.random() * 12) + 5}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent-amber">
                    task_alt
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Active Tasks
                    </p>
                    <p className="text-xs text-slate-500 dark:text-[#bab29c]">
                      Currently in progress
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-accent-amber">
                  {getTaskStats().pending}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Padding */}
        <div className="h-20"></div>
      </main>
      <BottomNav />
    </div>
  );
};

export default StatsPage;