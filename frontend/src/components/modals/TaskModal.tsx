import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  TextInput,
  Flex,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { PlusIcon } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { clientSchema, type ClientSchemaData } from "@/lib/types/ClientSchema";
import { taskSchema, type TaskSchemaData } from "@shared/index";
import { postData } from "@/lib/fetcher";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const TaskModal = ({ projectId }: { projectId: string }) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(taskSchema),
  });

  const onSubmit: SubmitHandler<TaskSchemaData> = async (data) => {
    const res = await postData(`/projects/${projectId}/tasks/create`, {
      ...data,
    });
    if (res.data.success) {
      toast(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ["single_project", projectId],
      });
      reset();
      close();
    }
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={close}
        title="Add new task"
        radius={8}
        size="md"
        style={{ borderRadius: "10px" }}
        transitionProps={{ transition: "fade-down", duration: 200 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={14}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div>
                  <TextInput data-autofocus label="Title" required {...field} />
                  <Text size="xs" mt={4} c="red.7" fw={500}>
                    {formState.errors.title?.message}
                  </Text>
                </div>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <Textarea
                    rows={5}
                    label="Details"
                    description="Give more info about this task"
                    required
                    {...field}
                  />
                  <Text size="xs" mt={4} c="red.7" fw={500}>
                    {formState.errors.description?.message}
                  </Text>
                </div>
              )}
            />
          </Stack>

          <Flex align="center" justify="flex-end" gap={6} mt={20}>
            <Button onClick={close} variant="subtle" color="gray">
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </Flex>
        </form>
      </Modal>

      <Button leftSection={<PlusIcon size={16} />} onClick={open}>
        Add Task
      </Button>
    </>
  );
};

export default TaskModal;
