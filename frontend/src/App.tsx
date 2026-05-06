// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes";

export default function App() {
  return (
    <MantineProvider>
      <AppRoutes />
    </MantineProvider>
  );
}
