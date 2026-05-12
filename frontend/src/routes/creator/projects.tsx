import {
  Anchor,
  Box,
  Card,
  Flex,
  Grid,
  RingProgress,
  Text,
} from "@mantine/core";
import AppLayout from "@/layouts/creator/AppLayout";
import ProjectModal from "@/components/modals/ProjectModal";
import { useFetchProjects } from "@/hooks/useFetchProjects";
import { Link } from "react-router";

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
        <Grid>
          {data.projects.map((project) => (
            <Grid.Col span={6} key={project.id}>
              <Card
                padding="sm"
                withBorder
                orientation="horizontal"
                shadow="none"
              >
                <Card.Section inheritPadding px="xs" withBorder>
                  <RingProgress
                    roundCaps
                    thickness={6}
                    size={150}
                    // sections={[{ value: (completed / total) * 100, color: 'blue' }]}
                    sections={[{ value: 0, color: "blue" }]}
                    label={
                      <div>
                        <Text ta="center" fz="lg">
                          {/* {((completed / total) * 100).toFixed(0)}% */}
                          0%
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
                  <Box mt="xs">
                    <Text fz="sm" fw={500}>
                      {project.client.name}
                    </Text>
                    <Text fz="xs" c="gray.7">
                      Client
                    </Text>
                  </Box>
                  <Box mt="xs">
                    <Text fz="sm" fw={500}>
                      1887
                    </Text>
                    <Text fz="xs" c="gray.7">
                      Completed
                    </Text>
                  </Box>

                  {/* <Group mt="sm">{items}</Group> */}
                </Card.Section>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </AppLayout>
  );
};

export default CreatorProjects;
