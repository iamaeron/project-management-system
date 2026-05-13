import { useFetchSingleProject } from "@/hooks/useFetchSingleProject";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import AppLayout from "@/layouts/creator/AppLayout";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  RingProgress,
  Text,
} from "@mantine/core";
import { useParams } from "react-router";
import ProjectTask from "@/components/project/ProjectTask";
import { type Task } from "@shared/src/db.types";
import TaskModal from "@/components/modals/TaskModal";

export default function CreatorProjectPage() {
  const { projectId } = useParams();
  const { data, isFetching } = useFetchSingleProject(projectId ?? "");

  if (isFetching) {
    return (
      <AppLayout>
        <div> Loading ...</div>
      </AppLayout>
    );
  }

  console.log(data);

  return (
    <AppLayout customLastCrumb={data.project.title}>
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
        </Paper>
        <Box flex={1} px={14}>
          <Text mt={16} fz="h2" tt="capitalize" fw={600}>
            {data.project.title}
          </Text>
          <Text c="gray.7">{data.project.description}</Text>
          <Flex mb={20} align="flex-end" justify="space-between">
            <Text fw={600} mt="xl" fz="lg">
              Tasks <span color="#adb5bd">{data.project.length}</span>
            </Text>

            <Flex>
              <TaskModal projectId={projectId ?? ""} />
            </Flex>
          </Flex>

          {/* <Divider my={10} /> */}
          <Grid>
            {data.project.tasks.map((task: Task) => (
              <ProjectTask key={task.id} task={task} />
            ))}
          </Grid>
        </Box>
      </Flex>
    </AppLayout>
  );
}
