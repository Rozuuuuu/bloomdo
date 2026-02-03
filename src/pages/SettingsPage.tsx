import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-settings-bg-dark font-display text-gray-900 dark:text-gray-100 min-h-screen">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-settings-bg-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between px-4 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight">Settings</h1>
                    <div className="size-10"></div> {/* Spacer for centering */}
                </div>
            </header>

            <main className="max-w-md mx-auto pb-12">
                {/* Section: General */}
                <section className="mt-4">
                    <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-primary/70">General</h3>
                    <div className="bg-white dark:bg-settings-card-dark mx-4 rounded-xl overflow-hidden border border-gray-200 dark:border-white/5">
                        {/* Theme */}
                        <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">palette</span>
                                <p className="text-base font-medium">Theme</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Dark</p>
                                <span className="material-symbols-outlined text-gray-300 dark:text-[20px]">chevron_right</span>
                            </div>
                        </div>
                        {/* Language */}
                        <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">language</span>
                                <p className="text-base font-medium">Language</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">English</p>
                                <span className="material-symbols-outlined text-gray-300 dark:text-[20px]">chevron_right</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Tasks */}
                <section className="mt-6">
                    <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-primary/70">Tasks</h3>
                    <div className="bg-white dark:bg-settings-card-dark mx-4 rounded-xl overflow-hidden border border-gray-200 dark:border-white/5">
                        {/* Priority Levels */}
                        <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">priority_high</span>
                                <p className="text-base font-medium">Priority Levels</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-300 dark:text-[20px]">chevron_right</span>
                        </div>
                        {/* AI Suggestions Toggle */}
                        <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                <div className="flex flex-col">
                                    <p className="text-base font-medium">AI Suggestions</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Smart priority sorting</p>
                                </div>
                            </div>
                            <label className="switch">
                                <input defaultChecked type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Section: Notifications */}
                <section className="mt-6">
                    <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-primary/70">Notifications</h3>
                    <div className="bg-white dark:bg-settings-card-dark mx-4 rounded-xl overflow-hidden border border-gray-200 dark:border-white/5">
                        {/* Push Notifications */}
                        <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between border-b border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">notifications</span>
                                <p className="text-base font-medium">Push Notifications</p>
                            </div>
                            <label className="switch">
                                <input defaultChecked type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                        {/* Email Digest */}
                        <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between border-b border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <p className="text-base font-medium">Email Digest</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                        {/* Quiet Hours */}
                        <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">bedtime</span>
                                <p className="text-base font-medium">Quiet Hours</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">10 PM - 7 AM</p>
                                <span className="material-symbols-outlined text-gray-300 dark:text-[20px]">chevron_right</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Backup & Sync */}
                <section className="mt-6">
                    <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-primary/70">Backup & Sync</h3>
                    <div className="bg-white dark:bg-settings-card-dark mx-4 rounded-xl overflow-hidden border border-gray-200 dark:border-white/5">
                        <div className="flex items-center gap-4 px-4 min-h-[56px] justify-between">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">cloud_sync</span>
                                <div className="flex flex-col">
                                    <p className="text-base font-medium">Cloud Sync</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Last synced: 2m ago</p>
                                </div>
                            </div>
                            <button className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30 hover:bg-primary/30 transition-colors">
                                SYNC NOW
                            </button>
                        </div>
                    </div>
                </section>

                {/* Danger Zone / Account */}
                <section className="mt-8 mb-4 px-4">
                    <button className="w-full bg-red-500/10 text-red-500 border border-red-500/20 py-3 rounded-xl font-semibold transition-all hover:bg-red-500/20">
                        Logout
                    </button>
                </section>

                {/* Footer Info */}
                <footer className="text-center py-6">
                    <p className="text-xs text-gray-500 dark:text-gray-600 font-medium tracking-wide">
                        Bloom-do version 2.4.1 (Build 890)
                    </p>
                    <div className="flex justify-center items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[14px] !text-gray-600">local_florist</span>
                        <p className="text-[10px] text-gray-500 dark:text-gray-600 uppercase tracking-widest">Made with Bloom-do</p>
                    </div>
                </footer>
            </main>

            {/* Navigation Tab Bar (Simulated iOS) - Visual Only */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background-light/95 dark:bg-settings-bg-dark/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 px-6 py-2 pb-6 flex justify-between">
                <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/dashboard')}>
                    <span className="material-symbols-outlined text-[28px]">list_alt</span>
                    <span className="text-[10px] mt-1">Tasks</span>
                </div>
                <div className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/calendar')}>
                    <span className="material-symbols-outlined text-[28px]">calendar_month</span>
                    <span className="text-[10px] mt-1">Planner</span>
                </div>
                <div className="flex flex-col items-center text-primary">
                    <span className="material-symbols-outlined text-[28px] fill-1">settings</span>
                    <span className="text-[10px] mt-1">Settings</span>
                </div>
            </nav>
        </div>
    );
}
