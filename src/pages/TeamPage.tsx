import { useNavigate } from 'react-router-dom';

export default function TeamPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-team-bg-dark text-slate-900 dark:text-white antialiased min-h-screen font-display">
            <div className="relative flex min-h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl">
                {/* TopAppBar */}
                <header className="flex items-center bg-background-light dark:bg-team-bg-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-white/10">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center font-display">Team & Collaboration</h2>
                    <div className="flex w-12 items-center justify-end">
                        <button
                            onClick={() => navigate('/settings')}
                            className="flex cursor-pointer items-center justify-center rounded-lg h-12 bg-transparent text-slate-900 dark:text-white"
                        >
                            <span className="material-symbols-outlined text-2xl">settings</span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {/* SearchBar */}
                    <div className="px-4 py-4">
                        <label className="flex flex-col min-w-40 h-12 w-full">
                            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                                <div className="text-[#bab29c] flex border-none bg-white dark:bg-[#393528] items-center justify-center pl-4 rounded-l-xl border-r-0">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-[#393528] focus:border-none h-full placeholder:text-[#bab29c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                                    placeholder="Search members or spaces"
                                    defaultValue=""
                                />
                            </div>
                        </label>
                    </div>

                    {/* SectionHeader: Collaborators */}
                    <div className="flex items-center justify-between px-4 pb-2 pt-2">
                        <h3 className="text-slate-900 dark:text-white text-lg font-extrabold leading-tight tracking-tight font-display">Collaborators</h3>
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Active Now</span>
                    </div>

                    {/* Collaborators Horizontal Scroll */}
                    <div className="flex items-center px-4 py-4 gap-4 overflow-x-auto no-scrollbar">
                        {/* Add Member Button */}
                        <div className="flex flex-col items-center gap-2">
                            <button className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined">person_add</span>
                            </button>
                            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Invite</span>
                        </div>
                        {/* Collaborator 1 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative size-14">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14 border-2 border-primary"
                                    aria-label="Profile picture of Sarah, a team collaborator"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1nz8jfKGR3vrVd465DT8PDyqxMiYnUIEQ_4hRWYa0B9tGzvUmM9hPCHhWro63O8ICdUqmiAW1ragy6QhHIW37QcRC_le7uf2E9Ihq6B9zNKE4O1m7oPDZAhfGmsunqar7Vq-Oxv01WL9NCgyxqnwwaI9GKE9GrVy51yEanEPHGWjDBuG_O9nsPH4PVpMg2hDbcCbLr-alT1QS_5HoEFOMypC_5xOLVYlDAm3JnAe2FoxENi-ZEb7AE7tilfqoRhHI7pwbq99rnMJp")' }}
                                ></div>
                                <div className="status-dot bg-green-500"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Sarah</span>
                        </div>
                        {/* Collaborator 2 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative size-14">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14 border-2 border-transparent"
                                    aria-label="Profile picture of Marc, a team collaborator"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoSHQhqt_MIuu5OVBDnCcjVFOnZ0fL9KeUlkBTVmnS3dLQIjLlYSc6kyDdIMxiTCBBhvzUeEYq5zSR2RRpYrLNUovJfxA_5KhssYfU8Tc0reYHGM0CPPSTEDEPqh3rNgWRJdvV4-CBsKgrB3g7oZiKTIBNNLQf-3cXkMK8hiUZG1pQQgG_GApp35PkHl_1ahtpSgG80qY8xHp473t7E_jJum3tq8v163PJZ4uzSboiFlI41XUvaxlJhTuB3mDm84ZC_BhPvCmo7WEB")' }}
                                ></div>
                                <div className="status-dot bg-orange-400"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Marc</span>
                        </div>
                        {/* Collaborator 3 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative size-14">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14 border-2 border-primary"
                                    aria-label="Profile picture of Elena, a team collaborator"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7WZcT3F6qn7Kc4IuDWbKTODdZpeZ9J_gOwEeTZFYT3SFFIuQkAbm9XherduIxo9dqTQ0oYRD4Rp6Y-krzP8aHUSVf10kRLQrbCidku9dZUMw6azi1g1ZuZwz1iCx_NgRXrs8SGdSnEm3TwlGSm5LZS6Sz-eaZ4OqYilKWOp_-QdB0jSWiYf6I56WwyBEdCUkNplMmeZaZpLdBAo2WeLDoeI5EHhLHRfD1bYcHTSnlExwrjM6baiOnMgtYa4mWQJ7RGKFqsIXkh2Gq")' }}
                                ></div>
                                <div className="status-dot bg-green-500"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">Elena</span>
                        </div>
                        {/* Collaborator 4 */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="relative size-14">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-14 border-2 border-transparent"
                                    aria-label="Profile picture of James, a team collaborator"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5b_Afd18C6hXoyMPKxAf4tXpd5iCz_2BYB2RZgcRMdYOCCKNnhkTLDgEFZTtRqj8PQXr16gJp71y3A8G8eVEY-Dm_nvVVLRWfyzAr6NSFExWcXbgPhhHyr1oO5WvJxB1OxFiuAi0B8IJNUf1WFQF8f3JmdvkPeIh_hvCBAkQAZzKXlVYAczdOivOxvqFaZmujBDslK7ke_uvVVq4esHs3oR2BHnCNggfi4ZFLUGJNYIoQNwO3lb88VOaa9XKw3skX9oGnVRMzKIG0")' }}
                                ></div>
                                <div className="status-dot bg-slate-400"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">James</span>
                        </div>
                    </div>

                    {/* SectionHeader: Shared Spaces */}
                    <div className="flex items-center justify-between px-4 pb-2 pt-6">
                        <h3 className="text-slate-900 dark:text-white text-lg font-extrabold leading-tight tracking-tight font-display">Shared Spaces</h3>
                    </div>

                    {/* Shared Spaces List */}
                    <div className="px-4 space-y-4 pb-24">
                        {/* Space Card 1 */}
                        <div className="bg-white dark:bg-[#2d291e] rounded-xl p-4 shadow-sm border border-slate-100 dark:border-white/5 hover:border-primary/20 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined">rocket_launch</span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold dark:text-white">Marketing Project</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">12 tasks pending • 4 members</p>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-[#393528] h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Progress</span>
                                <span className="text-[10px] font-bold text-primary uppercase">45%</span>
                            </div>
                        </div>
                        {/* Space Card 2 */}
                        <div className="bg-white dark:bg-[#2d291e] rounded-xl p-4 shadow-sm border border-slate-100 dark:border-white/5 hover:border-orange-400/20 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-orange-400/20 flex items-center justify-center text-orange-400">
                                        <span className="material-symbols-outlined">shopping_cart</span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold dark:text-white">Family Errands</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">5 tasks pending • 2 members</p>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-[#393528] h-2 rounded-full overflow-hidden">
                                <div className="bg-orange-400 h-full rounded-full" style={{ width: '80%' }}></div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Progress</span>
                                <span className="text-[10px] font-bold text-orange-400 uppercase">80%</span>
                            </div>
                        </div>
                        {/* Space Card 3 */}
                        <div className="bg-white dark:bg-[#2d291e] rounded-xl p-4 shadow-sm border border-slate-100 dark:border-white/5 hover:border-emerald-400/20 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                                        <span className="material-symbols-outlined">auto_awesome</span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold dark:text-white">Product Launch</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Ready for release • 6 members</p>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-white transition-colors"><span className="material-symbols-outlined">more_horiz</span></button>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-[#393528] h-2 rounded-full overflow-hidden">
                                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                                <span className="text-[10px] font-bold text-emerald-400 uppercase">Completed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button / Fixed Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent">
                    <button className="flex w-full h-14 items-center justify-center rounded-xl bg-primary text-background-dark font-extrabold text-base shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform">
                        <span className="material-symbols-outlined mr-2">group_add</span>
                        Invite New Member
                    </button>
                </div>
            </div>
        </div>
    );
}
