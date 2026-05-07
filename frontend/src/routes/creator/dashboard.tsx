import {
  ActionIcon,
  AppShell,
  Container,
  Flex,
  Image,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  Bill,
  CaseRound,
  HomeSmile,
  NotesMinimalistic,
  Sidebar,
} from "@solar-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router";

const CreatorDashboard = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar bg="#f4f4f5" withBorder={false}>
        <AppShell.Section p="md" pr="0" pt="xl" pl="lg">
          <Flex align="center" justify="space-between">
            <Text size="xl" fw="bold">
              ProManSys
            </Text>
            <Tooltip
              label="Toggle sidebar"
              style={{ fontSize: "13px" }}
              position="bottom"
              openDelay={500}
            >
              <ActionIcon variant="subtle" color="#a1a1aa" onClick={toggle}>
                <Sidebar size={22} color="#3f3f46" />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </AppShell.Section>
        <AppShell.Section pl="md" pe="0">
          <Flex
            align="center"
            gap="sm"
            p="xs"
            pt="md"
            style={{ borderTop: "1px solid #e4e4e7" }}
          >
            <Image
              src="https://64.media.tumblr.com/c09da35c8071e842fd4df4a5fb492bbe/bd3be9c1b99ed113-4f/s400x600/e493c13b9fec973ea8d14b8629e069e3c06b0b58.jpg"
              h={30}
              w={30}
              fit="cover"
              radius="100%"
            />
            <div>
              <Text size="sm" style={{ fontWeight: "500" }}>
                John Doe
              </Text>
            </div>
          </Flex>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea} px="md" pr="0">
          <Stack gap="2px">
            <NavLink
              // style={{ "--nl-hover": "#d4d4d8 !important" }}
              component={Link}
              to="#"
              onClick={(event) => event.preventDefault()}
              style={{ fontWeight: "500", borderRadius: "8px" }}
              leftSection={<HomeSmile size={22} color="#3f3f46" />}
              label="Dashboard"
            />

            <NavLink
              // style={{ "--nl-hover": "#d4d4d8 !important" }}
              component={Link}
              to="#"
              onClick={(event) => event.preventDefault()}
              style={{ fontWeight: "500", borderRadius: "8px" }}
              leftSection={<CaseRound size={22} color="#3f3f46" />}
              label="Clients"
            />

            <NavLink
              // style={{ "--nl-hover": "#d4d4d8 !important" }}
              component={Link}
              to="#"
              onClick={(event) => event.preventDefault()}
              style={{ fontWeight: "500", borderRadius: "8px" }}
              leftSection={<NotesMinimalistic size={22} color="#3f3f46" />}
              label="Projects"
            />

            <NavLink
              // style={{ "--nl-hover": "#d4d4d8 !important" }}
              component={Link}
              to="#"
              onClick={(event) => event.preventDefault()}
              style={{ fontWeight: "500", borderRadius: "8px" }}
              leftSection={<Bill size={22} color="#3f3f46" />}
              label="Invoices"
            />
          </Stack>
        </AppShell.Section>
        <AppShell.Section p="md" pr="0">
          Notification here
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main style={{ display: "flex" }} bg="#f4f4f5">
        <Container
          fluid
          bg="white"
          style={{ flex: "1", borderRadius: "8px" }}
          p="md"
        >
          Hey
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default CreatorDashboard;
