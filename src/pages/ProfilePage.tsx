import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';

export default function ProfilePage() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-profile-bg-dark font-display text-gray-900 dark:text-ivory min-h-screen pb-20">
            <Header />
            <div className="max-w-md mx-auto flex flex-col pb-10">
                {/* Header replaced by Top Nav */}

                {/* ProfileHeader */}
                <div className="flex p-4 @container flex-col items-center">
                    <div className="flex w-full flex-col gap-6 items-center">
                        <div className="relative flex flex-col items-center">
                            <div className="relative">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-primary/20"
                                    aria-label="Professional profile portrait of Alex Sunflower"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBE-6JSA1zx5621GYU1gXB8aOuuUgDbyC0leuVvq2i33C5W-OHG_0rGBuievYF8aVDbA_RLhrqOH7cZ5Tn-46oxeMMHTLMns1G6yyVz3n0vZzZ9dh688MPszHCHT37QU0JnRqkFRGSrZq2PS98zVDLXsnHFrAighIOVG5CR4lq-qK5FQTci2vCYWmx-5ceZf5eCu8ddD2ywRjuqFkM30G3qoC9zvCUUn_RTHOVNoSd9E3kZRt3sDBsyrfI3iH1tQnbOyvU-Wg6MofJV")' }}
                                >
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap uppercase tracking-wider">
                                    Level 10
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center mt-6">
                                <p className="text-gray-900 dark:text-ivory text-2xl font-bold leading-tight tracking-tight">Alex Sunflower</p>
                                <p className="text-primary font-medium text-sm mt-1">Productivity Specialist</p>
                            </div>
                        </div>
                        <button className="flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-background-dark text-sm font-bold leading-normal tracking-wide shadow-lg shadow-primary/10 hover:bg-primary/90 transition-colors active:scale-95">
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>

                {/* Productivity Summary (Stats) */}
                <div className="px-4 mt-6">
                    <h3 className="text-gray-500 dark:text-ivory/60 text-xs font-bold uppercase tracking-widest mb-4 ml-1">Productivity Summary</h3>
                    <div className="flex gap-4">
                        <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl p-5 bg-white dark:bg-profile-card-dark border border-gray-200 dark:border-white/5 shadow-sm">
                            <p className="text-gray-600 dark:text-ivory/70 text-sm font-medium">Tasks Completed</p>
                            <p className="text-primary tracking-tight text-3xl font-bold leading-tight">1,248</p>
                        </div>
                        <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl p-5 bg-white dark:bg-profile-card-dark border border-gray-200 dark:border-white/5 shadow-sm">
                            <p className="text-gray-600 dark:text-ivory/70 text-sm font-medium">Focus Hours</p>
                            <p className="text-primary tracking-tight text-3xl font-bold leading-tight">450</p>
                        </div>
                    </div>
                </div>

                {/* Settings Link (Moved from Header) */}
                <div className="mt-2 text-right px-4">
                    <button
                        onClick={() => navigate('/settings')}
                        className="text-primary text-sm font-bold hover:underline flex items-center justify-end gap-1 ml-auto"
                    >
                        <span className="material-symbols-outlined text-lg">settings</span>
                        App Settings
                    </button>
                </div>

                {/* Personal Information Section */}
                <div className="mt-4">
                    <h3 className="text-gray-500 dark:text-ivory/60 text-xs font-bold uppercase tracking-widest px-5 mb-2">Personal Information</h3>
                    <div className="mx-4 bg-white dark:bg-profile-card-dark rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-xl">person</span>
                            </div>
                            <p className="text-gray-900 dark:text-ivory text-base font-medium flex-1">Name</p>
                            <div className="shrink-0 flex items-center gap-2">
                                <p className="text-gray-500 dark:text-ivory/50 text-base">Alex Sunflower</p>
                                <span className="material-symbols-outlined text-gray-400 dark:text-ivory/30 text-lg">chevron_right</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-xl">mail</span>
                            </div>
                            <p className="text-gray-900 dark:text-ivory text-base font-medium flex-1">Email</p>
                            <div className="shrink-0 flex items-center gap-2">
                                <p className="text-gray-500 dark:text-ivory/50 text-base">alex@bloom.app</p>
                                <span className="material-symbols-outlined text-gray-400 dark:text-ivory/30 text-lg">chevron_right</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Security Section */}
                <div className="mt-8">
                    <h3 className="text-gray-500 dark:text-ivory/60 text-xs font-bold uppercase tracking-widest px-5 mb-2">Account Security</h3>
                    <div className="mx-4 bg-white dark:bg-profile-card-dark rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-xl">lock</span>
                            </div>
                            <p className="text-gray-900 dark:text-ivory text-base font-medium flex-1">Change Password</p>
                            <span className="material-symbols-outlined text-gray-400 dark:text-ivory/30 text-lg">chevron_right</span>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined text-xl">fingerprint</span>
                            </div>
                            <p className="text-gray-900 dark:text-ivory text-base font-medium flex-1">Two-Factor Auth</p>
                            <div className="shrink-0">
                                <div className="w-10 h-6 bg-primary rounded-full relative">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-background-light dark:bg-background-dark rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integrations Section */}
                <div className="mt-8">
                    <h3 className="text-gray-500 dark:text-ivory/60 text-xs font-bold uppercase tracking-widest px-5 mb-2">Integrations</h3>
                    <div className="mx-4 bg-white dark:bg-profile-card-dark rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0">
                            <div className="w-8 h-8 rounded-lg bg-[#4A154B]/20 flex items-center justify-center text-[#4A154B] dark:text-[#E01E5A]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-6a2 2 0 1 0 0 4V9zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-6a2 2 0 1 0 0 4V3zm0 12a2 2 0 1 0 0 4v-4zm6-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a2 2 0 1 0 0 4V15z"></path></svg>
                            </div>
                            <p className="text-gray-900 dark:text-ivory text-base font-medium flex-1">Slack</p>
                            <p className="text-primary text-sm font-bold">Connected</p>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0">
                            <div className="w-8 h-8 rounded-lg bg-[#4285F4]/20 flex items-center justify-center text-[#4285F4]">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></svg>
                            </div>
                            <p className="text-gray-900 dark:text-ivory text-base font-medium flex-1">Google Calendar</p>
                            <p className="text-primary text-sm font-bold">Connected</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 px-4 flex flex-col items-center">
                    <button className="w-full flex items-center justify-center h-14 rounded-xl border border-red-500/30 text-red-500 font-bold hover:bg-red-500/5 transition-colors">
                        <span className="material-symbols-outlined mr-2">logout</span>
                        Log Out
                    </button>
                    <p className="mt-6 text-gray-400 dark:text-ivory/20 text-xs font-medium">Bloom-do-app v2.4.1 (Stable)</p>
                </div>
            </div>
            <BottomNav />
        </div >
    );
}
