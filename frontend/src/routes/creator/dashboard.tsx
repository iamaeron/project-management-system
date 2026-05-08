import { Text } from "@mantine/core";
import { authClient } from "@/lib/auth-client";
import AppLayout from "@/layouts/creator/AppLayout";

const CreatorDashboard = () => {
  const user = authClient.useSession();

  return (
    <AppLayout>
      <Text size="xl" fw={600}>
        Hello, {user.data?.user.name}
      </Text>
    </AppLayout>
  );
};

export default CreatorDashboard;
