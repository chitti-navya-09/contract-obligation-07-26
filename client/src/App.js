import "./assets/global.css";
import PageContainer from "./layout/PageContainer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UIProvider } from './context/UIContext';
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import Reports from "./pages/Reports";
import QuickActions from "./pages/QuickActions";
import Calendar from "./pages/Calendar";

// Retained pages only: Settings, Notifications, Reports & Analytics,
// Profile, Help & Support, Quick Actions, Calendar.
// All other page files remain in /pages/ for future reference but are
// intentionally not imported or routed here.

function AppShell() {
  return (
    <PageContainer>
      <Routes>
        <Route path="/" element={<Navigate to="/reports" replace />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/quick-actions" element={<QuickActions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="*" element={<Navigate to="/reports" replace />} />
      </Routes>
    </PageContainer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route path="/*" element={<AppShell />} />
        </Routes>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;
