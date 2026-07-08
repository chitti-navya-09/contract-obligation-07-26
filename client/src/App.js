import "./assets/global.css";
import DashboardLayout from "./layout/DashboardLayout";
import RenewalDashboard from "./pages/RenewalDashboard";

function App() {
  return (
    <DashboardLayout>
      <RenewalDashboard />
    </DashboardLayout>
  );
}

export default App;
