import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ProfessionalFocusPage() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [totalTime, setTotalTime] = useState(25 * 60);
    const [earnedSeeds, setEarnedSeeds] = useState(0);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    // Circle circumference for SVG
    const radius = 130;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setEarnedSeeds(prev => prev + 3); // Mock reward
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleStop = () => {
        setIsActive(false);
        setTimeLeft(25 * 60);
        setTotalTime(25 * 60);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-ivory antialiased selection:bg-primary/30 min-h-screen">
            {/* Focus Mode Container */}
            <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden px-6 py-12">
                {/* Top App Bar (Minimal) */}
                <header className="flex flex-col items-center gap-1">
                    <div className="flex items-center justify-between w-full mb-8">
                        <button
                            onClick={() => navigate('/')}
                            className="flex size-10 items-center justify-center rounded-full bg-surface/10 dark:bg-surface/50 text-gray-600 dark:text-ivory/60 hover:text-gray-900 dark:hover:text-ivory cursor-pointer transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <span className={`size-2 rounded-full bg-primary ${isActive ? 'animate-pulse' : ''}`}></span>
                            <p className="text-xs font-bold uppercase tracking-widest text-primary/80">Deep Work</p>
                        </div>
                        <button className="flex size-10 items-center justify-center rounded-full bg-surface/10 dark:bg-surface/50 text-gray-600 dark:text-ivory/60 hover:text-gray-900 dark:hover:text-ivory cursor-pointer transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                    <h2 className="text-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-ivory">Design System Documentation</h2>
                    <p className="text-sm font-medium text-gray-500 dark:text-ivory/40">Project: Bloom UI Kit</p>
                </header>

                {/* Central Timer Section */}
                <main className="flex flex-1 flex-col items-center justify-center py-12">
                    <div className="relative flex items-center justify-center">
                        {/* Circular Progress Ring (SVG) */}
                        <svg className={`size-[280px] md:size-[320px] ${isActive ? 'glow-yellow' : ''} transition-all duration-500`}>
                            <circle className="text-gray-200 dark:text-surface" cx="140" cy="140" fill="transparent" r={radius} stroke="currentColor" strokeWidth="8"></circle>
                            <circle
                                className="text-primary progress-ring-circle transition-all duration-1000 ease-linear"
                                cx="140" cy="140"
                                fill="transparent"
                                r={radius}
                                stroke="currentColor"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                strokeWidth="8"
                                transform="rotate(-90 140 140)"
                            ></circle>
                        </svg>
                        {/* Timer Digits */}
                        <div className="absolute flex flex-col items-center justify-center">
                            <div className="flex gap-2">
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-light tracking-tight text-gray-900 dark:text-ivory md:text-7xl">
                                        {minutes.toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-ivory/30">Min</span>
                                </div>
                                <span className="text-5xl font-light text-primary/50 -mt-1">:</span>
                                <div className="flex flex-col items-center">
                                    <span className="text-6xl font-light tracking-tight text-gray-900 dark:text-ivory md:text-7xl">
                                        {seconds.toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-ivory/30">Sec</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Session Progress Bar */}
                    <div className="mt-12 w-full max-w-xs space-y-3">
                        <div className="flex items-end justify-between">
                            <p className="text-sm font-medium text-gray-500 dark:text-ivory/60">Session Progress</p>
                            <p className="text-sm font-bold text-primary">{Math.round(progress)}%</p>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-surface">
                            <div
                                className="h-full rounded-full bg-primary glow-yellow transition-all duration-1000 ease-linear"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </main>

                {/* Action Controls */}
                <footer className="flex flex-col items-center gap-6">
                    <div className="flex w-full max-w-md justify-center gap-4">
                        <button
                            onClick={handleStop}
                            className="flex h-16 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-ivory/10 bg-white dark:bg-surface px-5 text-gray-900 dark:text-ivory transition-all hover:bg-gray-50 dark:hover:bg-surface/80 active:scale-95 shadow-sm dark:shadow-none"
                        >
                            <span className="material-symbols-outlined text-xl">stop_circle</span>
                            <span className="text-base font-bold tracking-wide">Stop</span>
                        </button>

                        {!isActive ? (
                            <button
                                onClick={handleStart}
                                className="flex h-16 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-white dark:text-background-dark transition-all hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/20 dark:shadow-none"
                            >
                                <span className="material-symbols-outlined text-xl">play_circle</span>
                                <span className="text-base font-bold tracking-wide">Start</span>
                            </button>
                        ) : (
                            <button
                                onClick={handlePause}
                                className="flex h-16 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-white dark:text-background-dark transition-all hover:bg-primary/90 active:scale-95 shadow-lg shadow-primary/20 dark:shadow-none"
                            >
                                <span className="material-symbols-outlined text-xl">pause_circle</span>
                                <span className="text-base font-bold tracking-wide">Pause</span>
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-surface/40 px-4 py-2">
                        <span className="material-symbols-outlined text-sm text-primary">eco</span>
                        <p className="text-xs font-medium text-gray-500 dark:text-ivory/50">
                            {earnedSeeds > 0 ? `${earnedSeeds} focus seeds earned` : 'Focus to earn seeds'}
                        </p>
                    </div>
                </footer>

                {/* Background Aesthetic (Subtle Texture) */}
                <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
                </div>
            </div>
        </div>
    );
}
