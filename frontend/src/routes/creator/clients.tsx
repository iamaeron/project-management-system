import ClientModal from "@/components/modals/ClientModal";
import { useFetchClients } from "@/hooks/useFetchClients";
import AppLayout from "@/layouts/creator/AppLayout";
import {
  ActionIcon,
  Center,
  CopyButton,
  Flex,
  Menu,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import type { Client, Project, Task } from "@shared/src/db.types";
import {
  Bill,
  CheckCircle,
  ClipboardCheck,
  Folder,
  Library,
  LinkMinimalistic,
  UserPlusRounded,
} from "@solar-icons/react";
import { Check, Ellipsis, UserPlus } from "lucide-react";

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
                data.clients.map((client: Client & { projects: Project[] }) => (
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
                      <Menu shadow="xl" offset={2} position="bottom-end">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <Ellipsis size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>{client.name}</Menu.Label>

                          <CopyButton
                            value={`http://localhost:5173/invite/fljkds78fbrwe78fs`}
                          >
                            {({ copied, copy }) => (
                              <Menu.Item
                                closeMenuOnClick={false}
                                onClick={copy}
                                leftSection={
                                  <UserPlusRounded
                                    weight="BoldDuotone"
                                    color="#495057"
                                    size={22}
                                  />
                                }
                                rightSection={
                                  copied ? (
                                    <Check color="#40c057" size={22} />
                                  ) : (
                                    <LinkMinimalistic
                                      weight="BoldDuotone"
                                      color="#495057"
                                      size={22}
                                    />
                                  )
                                }
                              >
                                Invite to your Portal
                              </Menu.Item>
                            )}
                          </CopyButton>

                          <Menu.Sub openDelay={120} closeDelay={150}>
                            <Menu.Sub.Target>
                              <Menu.Sub.Item
                                leftSection={
                                  <Library
                                    strokeWidth={2}
                                    weight="BoldDuotone"
                                    size={22}
                                    color="#495057"
                                  />
                                }
                              >
                                View Projects
                              </Menu.Sub.Item>
                            </Menu.Sub.Target>

                            <Menu.Sub.Dropdown>
                              <Menu.Label>Projects</Menu.Label>
                              {client.projects.map((project) => (
                                <Menu.Item
                                  leftSection={
                                    <Folder
                                      weight="BoldDuotone"
                                      color="#495057"
                                      size={22}
                                    />
                                  }
                                >
                                  {project.title}
                                </Menu.Item>
                              ))}
                            </Menu.Sub.Dropdown>
                          </Menu.Sub>
                          <Menu.Item
                            leftSection={
                              <Bill
                                strokeWidth={2}
                                weight="BoldDuotone"
                                color="#495057"
                                size={22}
                              />
                            }
                          >
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
