import { useFetchSingleProject } from "@/hooks/useFetchSingleProject";
import AppLayout from "@/layouts/creator/AppLayout";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Image,
  Paper,
  RingProgress,
  Text,
  Tooltip,
} from "@mantine/core";
import { useParams } from "react-router";
import ProjectTask from "@/components/project/ProjectTask";
import { type Task } from "@shared/src/db.types";
import TaskModal from "@/components/modals/TaskModal";
import { Settings } from "lucide-react";
import { Widget } from "@solar-icons/react";
import AppTooltip from "@/components/app/AppTooltip";
import CommentDrawer from "@/components/drawers/CommentDrawer";

export default function CreatorProjectPage() {
  const { projectId } = useParams();
  const { data, isFetching } = useFetchSingleProject(projectId ?? "");

  if (isFetching) {
    return (
      <AppLayout backPage="/creator/projects">
        <div> Loading ...</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      backPage="/creator/projects"
      customLastCrumb={data.project.title}
    >
      <div style={{ paddingBottom: "100px" }}>
        <Image
          w="100%"
          h={200}
          radius={14}
          src="https://meshgradient.com/gallery/2.png"
          mb={20}
        />
        <Flex>
          <Paper shadow="none">
            <RingProgress
              roundCaps
              thickness={6}
              size={150}
              sections={[
                {
                  value:
                    data.project.tasks.length > 0
                      ? (Number(data.project.completedCount) /
                          data.project.tasks.length) *
                        100
                      : 0,
                  color: "blue",
                },
              ]}
              // sections={[{ value: 0, color: "blue" }]}
              label={
                <div>
                  <Text ta="center" fz="lg">
                    {/* {((completed / total) * 100).toFixed(0)}% */}
                    {data.project.tasks.length > 0
                      ? (
                          (Number(data.project.completedCount) /
                            data.project.tasks.length) *
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
          </Paper>
          <Box mt={16} flex={1} px={14}>
            <Flex justify={"space-between"}>
              <Box>
                <Text fz="h2" tt="capitalize" fw={600}>
                  {data.project.title}
                </Text>
                <Text c="gray.7">{data.project.description}</Text>
              </Box>

              <Tooltip.Group openDelay={500}>
                <Flex gap={6}>
                  <CommentDrawer />

                  <AppTooltip label="Project Settings">
                    <ActionIcon size="md" variant="subtle" color="gray">
                      <Settings size={22} />
                    </ActionIcon>
                  </AppTooltip>
                </Flex>
              </Tooltip.Group>
            </Flex>
            <Flex mb={20} align="flex-end" justify="space-between">
              <Text fw={600} mt="xl" fz="lg">
                Tasks <span color="#adb5bd">{data.project.length}</span>
              </Text>

              <Flex>
                <TaskModal projectId={projectId ?? ""} />
              </Flex>
            </Flex>

            {/* <Divider my={10} /> */}
            {data.project.tasks.length > 0 ? (
              <Grid>
                {data.project.tasks
                  .sort(
                    (a: Task, b: Task) =>
                      Number(a.isCompleted) - Number(b.isCompleted),
                  )
                  .map((task: Task) => (
                    <ProjectTask key={task.id} task={task} />
                  ))}
              </Grid>
            ) : (
              <Flex
                py={20}
                align="center"
                justify={"center"}
                direction="column"
              >
                <Widget size={50} style={{ color: "#868e96" }} />
                <Text mt={10} c="dark.4">
                  There isn't any task yet.
                </Text>
              </Flex>
            )}
          </Box>
        </Flex>
      </div>
    </AppLayout>
  );
}
