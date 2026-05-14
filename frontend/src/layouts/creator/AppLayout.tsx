import {
  ActionIcon,
  AppShell,
  Container,
  Flex,
  Paper,
  Pill,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import {
  Bill,
  CaseRound,
  HomeSmile,
  Inbox,
  NotesMinimalistic,
  Sidebar,
} from "@solar-icons/react";
import { useDisclosure } from "@mantine/hooks";
import SidebarLink from "@/components/sidebar/SidebarLink";
import { authClient } from "@/lib/auth-client";
import { Link } from "react-router";
import UserAvatar from "@/components/user/UserAvatar";
import AppBreadcrumbs from "@/components/app/AppBreadcrumbs";
import { ArrowLeft } from "lucide-react";
import AppTooltip from "@/components/app/AppTooltip";

interface AppLayoutProps {
  children: React.ReactNode;
  customLastCrumb?: string;
  backPage?: string;
}

const AppLayout = ({ children, customLastCrumb, backPage }: AppLayoutProps) => {
  const user = authClient.useSession();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar bg="#f4f4f5" withBorder={false}>
        <AppShell.Section p="md" pr="0" pt="xl" pl="lg">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <Text size="xl" fw="bold">
                PMS
              </Text>

              <div
                style={{
                  borderRight: "1px solid #d4d4d8",
                  height: 10,
                  margin: "0 4px 0 14px",
                }}
              ></div>

              <Pill>Creator</Pill>
            </Flex>
            <AppTooltip label="Toggle sidebar" openDelay={500}>
              <ActionIcon variant="subtle" color="#a1a1aa" onClick={toggle}>
                <Sidebar size={22} color="#3f3f46" />
              </ActionIcon>
            </AppTooltip>
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
            <UserAvatar />
            <div>
              <Text size="sm" style={{ fontWeight: "500" }}>
                {user.data?.user.name}
              </Text>
            </div>
          </Flex>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea} px="md" pr="0">
          <Stack gap="6px">
            <SidebarLink
              to="/creator/dashboard"
              icon={HomeSmile}
              label="Dashboard"
            />

            <SidebarLink
              to="/creator/clients"
              icon={CaseRound}
              label="Clients"
            />

            <SidebarLink
              to="/creator/projects"
              icon={NotesMinimalistic}
              label="Projects"
            />

            <SidebarLink to="/creator/invoices" icon={Bill} label="Invoices" />
          </Stack>
        </AppShell.Section>
        <AppShell.Section p="md" pr="0">
          <Paper mih={250} p="sm" shadow="sm">
            <Flex align="center" mb={8} gap={8} px={4}>
              <Inbox size={18} />
              <Text size="sm" fw={600}>
                Inbox
              </Text>
            </Flex>

            <Stack>
              <Paper p={6} px={10} bg="gray.2" shadow="0" radius="sm">
                <Flex>
                  <div></div>
                  <Text size="sm">hey</Text>
                </Flex>
              </Paper>
            </Stack>
          </Paper>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main style={{ display: "flex", height: "100vh" }} bg="#f4f4f5">
        <Paper
          radius={8}
          bg="white"
          shadow="xl"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <ScrollArea h="100%" scrollbarSize={8}>
            <Container pt={0} fluid p="lg">
              <AppShell.Section
                bg="white"
                pos="sticky"
                style={{ zIndex: "50" }}
                top={0}
                py={20}
              >
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    {backPage ? (
                      <>
                        <ActionIcon
                          component={Link}
                          to={backPage}
                          variant="subtle"
                          color="gray"
                          // leftSection={<ChevronLeft size={16} />}
                        >
                          <ArrowLeft size={16} />
                        </ActionIcon>
                        <div
                          style={{
                            // borderRight: "1px solid #adb5bd",
                            height: "8px",
                            margin: "0px 20px 0 10px",
                          }}
                        ></div>
                      </>
                    ) : (
                      <div></div>
                    )}
                    <AppBreadcrumbs customLastCrumb={customLastCrumb} />
                  </Flex>

                  <UserAvatar />
                </Flex>
              </AppShell.Section>

              {children}
            </Container>
          </ScrollArea>
        </Paper>
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
