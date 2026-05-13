import {
  Anchor,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  RingProgress,
  Text,
} from "@mantine/core";
import AppLayout from "@/layouts/creator/AppLayout";
import ProjectModal from "@/components/modals/ProjectModal";
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { Link } from "react-router";
import type { Project, Task } from "@shared/src/db.types";

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
      <Flex mb={20} align="flex-end" justify="space-between">
        <Text size="xl" fw={600}>
          Projects
        </Text>

        <Flex>
          <ProjectModal />
        </Flex>
      </Flex>

      <div>
        <Grid gap={16}>
          {data.projects.map(
            (
              project: Project & {
                tasks: Task[];
                completedCount: string;
                pendingCount: string;
              },
            ) => (
              <Grid.Col span={6} key={project.id}>
                <Card padding="sm" shadow="none">
                  <Image
                    w="100%"
                    h={100}
                    radius={6}
                    src="https://meshgradient.com/gallery/2.png"
                    mb={10}
                  />

                  <Group>
                    <Card.Section inheritPadding px="xs">
                      <RingProgress
                        roundCaps
                        thickness={6}
                        size={150}
                        sections={[
                          {
                            value:
                              (Number(project.completedCount) /
                                project.tasks.length) *
                              100,
                            color: "blue",
                          },
                        ]}
                        label={
                          <div>
                            <Text ta="center" fz="lg">
                              {(
                                (Number(project.completedCount) /
                                  project.tasks.length) *
                                100
                              ).toFixed(0)}
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
