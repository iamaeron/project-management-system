import { Route, Routes } from "react-router";
import Landing from "./landing";
import CreatorDashboard from "./creator/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Creator routes */}
      <Route path="creator">
        <Route path="dashboard" element={<CreatorDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
