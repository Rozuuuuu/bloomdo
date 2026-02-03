import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import CalendarPage from '../pages/CalendarPage';
import TaskCreatePage from '../pages/TaskCreatePage';
import DependencyPage from '../pages/DependencyPage';
import TaskDetailsPage from '@/pages/TaskDetailsPage';
import StatsPage from '@/pages/StatsPage';
import ProfessionalFocusPage from '@/pages/ProfessionalFocusPage';
import ProfilePage from '@/pages/ProfilePage';
import SettingsPage from '@/pages/SettingsPage';
import TeamPage from '@/pages/TeamPage';
import NotFoundPage from '../pages/NotFoundPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/focus" element={<ProfessionalFocusPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/create-task" element={<TaskCreatePage />} />
      <Route path="/edit-task/:id" element={<TaskCreatePage />} />
      <Route path="/task/:id" element={<TaskDetailsPage />} /> {/* Add this line */}
      <Route path="/dependencies" element={<DependencyPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;