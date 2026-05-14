import ClientModal from "@/components/modals/ClientModal";
import { useFetchClients } from "@/hooks/useFetchClients";
import AppLayout from "@/layouts/creator/AppLayout";
import {
  ActionIcon,
  Center,
  Flex,
  Menu,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import type { Client, Task } from "@shared/src/db.types";
import { Bill, Folder } from "@solar-icons/react";
import { Ellipsis, UserPlus } from "lucide-react";

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
                <Table.Th> </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.clients.length ? (
                data.clients.map((client: Client & { projects: Task[] }) => (
                  <Table.Tr key={client.id}>
                    <Table.Td fw={500}>{client.name}</Table.Td>
                    <Table.Td>{client.email}</Table.Td>
                    <Table.Td>
                      <Text>{client.projects.length}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text>1</Text>
                    </Table.Td>
                    <Table.Td>
                      <Menu shadow="xl" position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <Ellipsis size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>{client.name}</Menu.Label>
                          <Menu.Item leftSection={<UserPlus size={16} />}>
                            Invite Client
                          </Menu.Item>
                          <Menu.Item leftSection={<Folder size={16} />}>
                            View Projects
                          </Menu.Item>
                          <Menu.Item leftSection={<Bill size={16} />}>
                            See Invoices
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
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
