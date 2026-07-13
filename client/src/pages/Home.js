// Not currently routed (Dashboard.js serves "/" — see App.js). Kept in sync
// with Dashboard's content so it's ready if this project ever wants a
// separate marketing/landing "Home" distinct from the authenticated
// Dashboard.
import Dashboard from "./Dashboard";

export default function Home() {
  return <Dashboard />;
}
