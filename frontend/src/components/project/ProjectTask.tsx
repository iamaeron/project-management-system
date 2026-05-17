import { putData } from "@/lib/fetcher";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Group,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import type { Task } from "@shared/src/db.types";
import {
  CheckCircle,
  ChecklistMinimalistic,
  CheckRead,
  ClipboardCheck,
  GalleryAdd,
  Hourglass,
  Pen,
} from "@solar-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCheck,
  ChevronDown,
  Image,
  LoaderCircle,
  Pin,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProjectTask = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();

  const [checked, setChecked] = useState(task.isCompleted);

  const onSubmit = async (status: boolean) => {
    const res = await putData(
      `/projects/${task.projectId}/tasks/${task.id}/status/toggle`,
      { status },
    );
    if (res.data.success) {
      toast(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ["single_project", task.projectId],
      });
    }
  };

  return (
    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
      <Paper
        p={16}
        shadow="none"
        withBorder
        style={{
          borderColor: checked && !task.isCompleted ? "#1f1f1f" : "",
          transitionDuration: "200ms",
        }}
      >
        <Flex gap={10} justify="space-between" align="flex-start">
          <Box>
            <Flex align="center" gap={14}>
              <ActionIcon
                m={-6}
                variant="subtle"
                color="gray"
                className="act-root-icon"
              >
                <Pin
                  size={20}
                  style={{ rotate: "40deg" }}
                  className="act-icon"
                />
              </ActionIcon>
              <Text mt={-3} fw={500}>
                {task.title}
              </Text>
            </Flex>
            <Box mt={2} ml={32}>
              <Text
                c="gray.7"
                size="sm"
                style={{ whiteSpace: "pre-wrap" }}
                lineClamp={2}
              >
                {task.description}
              </Text>
            </Box>
          </Box>
          {!task.isCompleted ? (
            <Group>
              <ActionIcon
                variant="subtle"
                color="gray"
                c="gray.6"
                className="act-root-icon"
              >
                <Pen size={20} />
              </ActionIcon>
            </Group>
          ) : null}
        </Flex>

        <Flex mt={20} align="flex-end" justify="flex-end">
          <Button.Group style={{ gap: "2px" }}>
            <Button.GroupSection
              variant="light"
              style={{
                borderTopRightRadius: "3px",
                borderBottomRightRadius: "3px",
              }}
              c={task.isCompleted ? "green.9" : "orange.9"}
              bg={task.isCompleted ? "green.1" : "orange.1"}
              size="compact-sm"
              radius="md"
            >
              {task.isCompleted ? <CheckCheck size={16} /> : null}
              <span style={{ marginLeft: task.isCompleted ? "6px" : "" }}>
                {task.isCompleted ? "Done" : "Pending"}
              </span>
            </Button.GroupSection>
            <Menu position="bottom-end" shadow="xl">
              <Menu.Target>
                <Button
                  size="compact-sm"
                  variant="light"
                  color="gray"
                  style={{
                    borderTopLeftRadius: "3px",
                    borderBottomLeftRadius: "3px",
                  }}
                  radius="md"
                >
                  <ChevronDown size={16} />
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>{task.title}</Menu.Label>
                <Menu.Item
                  mb={4}
                  leftSection={
                    <GalleryAdd
                      weight="BoldDuotone"
                      color="#495057"
                      size={22}
                    />
                  }
                >
                  Attach progress image
                </Menu.Item>
                <Menu.Divider />
                {/* <Menu.Label>Task Status</Menu.Label> */}
                <Menu.Item
                  // bg={task.isCompleted ? "orange.0" : "green.0"}
                  // c={task.isCompleted ? "orange.9" : "green.9"}
                  onClick={() => onSubmit(!task.isCompleted)}
                  leftSection={
                    task.isCompleted ? (
                      <Hourglass
                        weight="BoldDuotone"
                        color="#495057"
                        size={22}
                      />
                    ) : (
                      <ClipboardCheck
                        weight="BoldDuotone"
                        color="#495057"
                        size={22}
                      />
                    )
                  }
                >
                  {task.isCompleted ? "Set as Pending" : "Mark as Done"}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Button.Group>
        </Flex>
      </Paper>
    </Grid.Col>
  );
};

export default ProjectTask;
