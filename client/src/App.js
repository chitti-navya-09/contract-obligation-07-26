import "./assets/global.css";
import PageContainer from "./layout/PageContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from './context/UIContext';
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Help from "./pages/Help";
import SwitchRole from "./pages/SwitchRole";
import Logout from "./pages/Logout";
import Repository from "./pages/Repository";
import Obligations from "./pages/Obligations";
import Renewals from "./pages/Renewals";
import Compliance from "./pages/Compliance";
import Reports from "./pages/Reports";
import Audit from "./pages/Audit";
import Users from "./pages/Users";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Everything that should show the sidebar + topbar shell lives here.
// Login/Signup are intentionally outside this (see App() below) since
// an auth screen shouldn't show the authenticated app's navigation.
function AppShell() {
  return (
    <PageContainer>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/switch-role" element={<SwitchRole/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/repository" element={<Repository/>} />
        <Route path="/obligations" element={<Obligations/>} />
        <Route path="/renewals" element={<Renewals/>} />
        <Route path="/compliance" element={<Compliance/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/audit" element={<Audit/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="*" element={<Dashboard/>} />
      </Routes>
    </PageContainer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/*" element={<AppShell/>} />
        </Routes>
      </UIProvider>
    </BrowserRouter>
  );
}

export default App;
