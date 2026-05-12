import ClientModal from "@/components/modals/ClientModal";
import { useFetchClients } from "@/hooks/useFetchClients";
import AppLayout from "@/layouts/creator/AppLayout";
import { Button, Center, Flex, Paper, Table, Text } from "@mantine/core";
import { Copy, Eye } from "lucide-react";

interface ClientData {
  name: string;
  email: string;
  id: string;
}

const CreatorClientsPage = () => {
  const { data, isFetching } = useFetchClients();

  if (isFetching) {
    return (
      <AppLayout>
        <div> Loading ...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Flex mb={20} align="flex-end" justify="space-between">
        <Text size="xl" fw={600}>
          Clients
        </Text>

        <Flex>
          <ClientModal />
        </Flex>
      </Flex>

      <Paper withBorder radius="md" shadow="0">
        <Table.ScrollContainer minWidth={500}>
          <Table horizontalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Projects</Table.Th>
                <Table.Th>Invoices</Table.Th>
                <Table.Th>Invite</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.clients.length ? (
                data.clients.map((client: ClientData) => (
                  <Table.Tr key={client.id}>
                    <Table.Td fw={500}>{client.name}</Table.Td>
                    <Table.Td>{client.email}</Table.Td>
                    <Table.Td>
                      <Button
                        leftSection={<Eye size={16} />}
                        variant="subtle"
                        color="gray"
                        size="compact-sm"
                      >
                        View
                      </Button>
                    </Table.Td>
                    <Table.Td>
                      <Button
                        leftSection={<Eye size={16} />}
                        variant="subtle"
                        color="gray"
                        size="compact-sm"
                      >
                        View
                      </Button>
                    </Table.Td>
                    <Table.Td>
                      <Button
                        leftSection={<Copy size={16} />}
                        variant="subtle"
                        color="gray"
                        size="compact-sm"
                      >
                        Copy
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td>
                    <Center p={10}>No clients found.</Center>
                  </Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </AppLayout>
  );
};

export default CreatorClientsPage;
