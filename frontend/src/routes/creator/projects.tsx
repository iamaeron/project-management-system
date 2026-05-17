import {
  Anchor,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  RingProgress,
  Text,
} from "@mantine/core";
import AppLayout from "@/layouts/creator/AppLayout";
import ProjectModal from "@/components/modals/ProjectModal";
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { Link } from "react-router";
import type { Project, Task } from "@shared/src/db.types";
import { Filter } from "lucide-react";

const CreatorProjects = () => {
  const { data, isFetching } = useFetchProjects();

  if (isFetching) {
    return (
      <AppLayout>
        <div> Loading ...</div>
      </AppLayout>
    );
  }

  console.log(data);

  return (
    <AppLayout>
      <Flex
        style={{ position: "sticky", top: "68px", zIndex: "40" }}
        pb={10}
        mb={10}
        bg="white"
        align="flex-end"
        justify="space-between"
      >
        <Text size="xl" fw={600}>
          Projects
        </Text>

        <Flex gap={10} align="center">
          <Button
            leftSection={<Filter size={16} />}
            size="sm"
            variant="outline"
            bd="1px solid #dee2e6"
          >
            Sort By
          </Button>
          <ProjectModal />
        </Flex>
      </Flex>

      <div style={{ paddingBottom: "100px" }}>
        <Grid gap={40}>
          {data.projects.map(
            (
              project: Project & {
                tasks: Task[];
                completedCount: string;
                pendingCount: string;
              },
            ) => (
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={project.id}>
                <Card padding="none" shadow="none">
                  <Image
                    w="100%"
                    h={100}
                    radius={6}
                    src="https://meshgradient.com/gallery/2.png"
                    mb={10}
                  />

                  <Group gap={0}>
                    <Card.Section inheritPadding px="xs">
                      <RingProgress
                        roundCaps
                        thickness={6}
                        size={150}
                        sections={[
                          {
                            value:
                              project.tasks.length > 0
                                ? (Number(project.completedCount) /
                                    project.tasks.length) *
                                  100
                                : 0,
                            color: "blue",
                          },
                        ]}
                        label={
                          <div>
                            <Text ta="center" fz="lg">
                              {project.tasks.length > 0
                                ? (
                                    (Number(project.completedCount) /
                                      project.tasks.length) *
                                    100
                                  ).toFixed(0)
                                : 0}
                              %
                            </Text>
                            <Text ta="center" fz="xs" c="gray.7">
                              Completed
                            </Text>
                          </div>
                        }
                      />
                    </Card.Section>

                    <Card.Section inheritPadding px="md">
                      <Anchor
                        component={Link}
                        to={`/creator/projects/${project.id}`}
                        fz="lg"
                        fw={500}
                        c="dark"
                      >
                        <span style={{ textTransform: "capitalize" }}>
                          {project.title}
                        </span>
                      </Anchor>
                      <Group gap={20}>
                        <Box mt="xs">
                          <Text fz="sm" fw={600}>
                            {project.tasks.length}
                          </Text>
                          <Text fz="xs" c="gray.7">
                            Tasks
                          </Text>
                        </Box>

                        <div
                          style={{
                            borderRight: "1px solid #adb5bd",
                            height: "14px",
                          }}
                        ></div>

                        <Box mt="xs">
                          <Text fz="sm" fw={600}>
                            {project.completedCount}
                          </Text>
                          <Text fz="xs" c="gray.7">
                            Completed
                          </Text>
                        </Box>

                        <Box mt="xs">
                          <Text fz="sm" fw={600}>
                            {project.pendingCount}
                          </Text>
                          <Text fz="xs" c="gray.7">
                            Pending
                          </Text>
                        </Box>
                      </Group>

                      <Box mt="xs">
                        <Text fz="sm" fw={500}>
                          {project.client.name}
                        </Text>
                        <Text fz="xs" c="gray.7">
                          Client
                        </Text>
                      </Box>

                      {/* <Group mt="sm">{items}</Group> */}
                    </Card.Section>
                  </Group>
                </Card>
              </Grid.Col>
            ),
          )}
        </Grid>
      </div>
    </AppLayout>
  );
};

export default CreatorProjects;
