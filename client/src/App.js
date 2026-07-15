import "./assets/global.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import PageContainer from "./layout/PageContainer";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import Reports from "./pages/Reports";
import QuickActions from "./pages/QuickActions";
import Calendar from "./pages/Calendar";

// Your page
import RenewalDashboard from "./pages/RenewalDashboard";
import UserManagement from "./pages/UserManagement";

function AppShell() {
  return (
    <PageContainer>
      <Routes>
        <Route path="/" element={<Navigate to="/renewal-dashboard" replace />} />

        <Route path="/renewal-dashboard" element={<RenewalDashboard />} />
        <Route path="/user-management" element={<UserManagement />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/quick-actions" element={<QuickActions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/calendar" element={<Calendar />} />

        <Route path="*" element={<Navigate to="/renewal-dashboard" replace />} />
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