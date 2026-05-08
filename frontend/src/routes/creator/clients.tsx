import ClientModal from "@/components/modals/ClientModal";
import AppLayout from "@/layouts/creator/AppLayout";
import { getData } from "@/lib/fetcher";
import { Button, Center, Flex, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface ClientData {
  name: string;
  email: string;
  id: string;
}

const CreatorClientsPage = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await getData("/clients");
      console.log(res);
      return res.data;
    },
  });

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

      <Table.ScrollContainer minWidth={500}>
        <Table>
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
                  <Table.Td>{client.name}</Table.Td>
                  <Table.Td>{client.email}</Table.Td>
                  <Table.Td>
                    <Button variant="outline">View</Button>
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
    </AppLayout>
  );
};

export default CreatorClientsPage;
