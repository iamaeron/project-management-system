import { putData } from "@/lib/fetcher";
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Group,
  Paper,
  Pill,
  Select,
  Text,
} from "@mantine/core";
import type { Task } from "@shared/src/db.types";
import { Pen } from "@solar-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCheck, ChevronDown, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProjectTask = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();

  const [checked, setChecked] = useState(task.isCompleted);

  const onSubmit = async () => {
    const res = await putData(
      `/projects/${task.projectId}/tasks/${task.id}/done`,
      {},
    );
    if (res.data.success) {
      toast(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ["single_project", task.projectId],
      });
    }
  };

  return (
    <Grid.Col span={6}>
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
            <Checkbox
              size="xs"
              disabled={task.isCompleted}
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              label={
                <Text mt={-3} fw={500}>
                  {task.title}
                </Text>
              }
            />
            <Box mt={2} ml={28}>
              {/* <Pill
                bg={task.isCompleted ? "green.1" : "orange.1"}
                c={task.isCompleted ? "green.9" : "orange.9"}
                mb={8}
                fw={600}
              >
                {task.isCompleted ? "Finished" : "Pending"}
              </Pill> */}
              <Text c="gray.7" size="sm" lineClamp={2}>
                {task.description}
              </Text>
            </Box>
          </Box>
          <Group>
            <ActionIcon variant="subtle" color="gray">
              <Pen size={20} />
            </ActionIcon>
          </Group>
        </Flex>

        <Flex mt={20} align="flex-end" justify="flex-end">
          {/* <Button
            size="compact-sm"
            style={{ borderColor: "#ced4da" }}
            variant="outline"
            radius="sm"
            leftSection={<CheckCheck size={16} />}
            onClick={onSubmit}
          >
            Done
          </Button> */}

          <Button.Group style={{ gap: "2px" }}>
            <Button.GroupSection
              variant="light"
              style={{
                borderTopRightRadius: "3px",
                borderBottomRightRadius: "3px",
              }}
              c={task.isCompleted ? "green.9" : "orange.9"}
              bg={task.isCompleted ? "green.1" : "orange.1"}
              // style={{ borderColor: task.isCompleted ? "#12b886" : "#ffa94d" }}
              size="compact-sm"
              radius="md"
            >
              {task.isCompleted ? <CheckCheck size={16} /> : null}
              <span style={{ marginLeft: task.isCompleted ? "6px" : "" }}>
                {" "}
                {task.isCompleted ? "Done" : "Pending"}
              </span>
            </Button.GroupSection>
            <Button
              size="compact-sm"
              // style={{ borderColor: "#ced4da" }}
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
          </Button.Group>
        </Flex>
      </Paper>
    </Grid.Col>
  );
};

export default ProjectTask;
