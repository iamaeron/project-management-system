import { Route, Routes } from "react-router";
import Landing from "./landing";
import CreatorDashboard from "./creator/dashboard";
import CreatorClientsPage from "./creator/clients";
import CreatorProjects from "./creator/projects";
import CreatorInvoices from "./creator/invoices";
import CreatorProjectPage from "./creator/project";
import ProtectedRoutes from "@/components/routes/ProtectedRoute";
import ClientDashboard from "./client/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Creator routes */}
      <Route element={<ProtectedRoutes allowedRoles={["creator"]} />}>
        <Route path="creator">
          <Route path="dashboard" element={<CreatorDashboard />} />
          <Route path="clients" element={<CreatorClientsPage />} />
          <Route path="invoices" element={<CreatorInvoices />} />
          {/* projects */}
          <Route path="projects" element={<CreatorProjects />} />
          <Route path="projects/:projectId" element={<CreatorProjectPage />} />
        </Route>
      </Route>

      {/* Client routes */}
      <Route element={<ProtectedRoutes allowedRoles={["client"]} />}>
        <Route path="client">
          <Route path="dashboard" element={<ClientDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
