import { Route, Routes } from "react-router";
import Landing from "./landing";
import CreatorDashboard from "./creator/dashboard";
import CreatorClientsPage from "./creator/clients";
import CreatorProjects from "./creator/projects";
import CreatorInvoices from "./creator/invoices";
import CreatorProjectPage from "./creator/project";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Creator routes */}
      <Route path="creator">
        <Route path="dashboard" element={<CreatorDashboard />} />
        <Route path="clients" element={<CreatorClientsPage />} />
        <Route path="invoices" element={<CreatorInvoices />} />
        {/* projects */}
        <Route path="projects" element={<CreatorProjects />} />
        <Route path="projects/:projectId" element={<CreatorProjectPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
