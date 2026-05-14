import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  TextInput,
  Flex,
  Stack,
  Text,
  Textarea,
  Select,
} from "@mantine/core";
import { PlusIcon } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { clientSchema, type ClientSchemaData } from "@/lib/types/ClientSchema";
import { projectSchema, type ProjectSchemaData } from "@shared/index";
import { postData } from "@/lib/fetcher";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchClients } from "@/hooks/useFetchClients";

const ProjectModal = () => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useFetchClients();
  const [opened, { open, close }] = useDisclosure(false);
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      clientId: "",
    },
    resolver: zodResolver(projectSchema),
  });

  const onSubmit: SubmitHandler<ProjectSchemaData> = async (data) => {
    const res = await postData("/projects/create", {
      ...data,
    });
    if (res.data.success) {
      toast(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
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
        title="New project"
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
                  <Textarea label="Description" {...field} />
                  <Text size="xs" mt={4} c="red.7" fw={500}>
                    {formState.errors.description?.message}
                  </Text>
                </div>
              )}
            />

            <Controller
              name="clientId"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    label="Client"
                    placeholder="Pick value"
                    data={
                      isFetching || !data
                        ? []
                        : data.clients.map(
                            (d: { id: string; name: string }) => ({
                              value: d.id,
                              label: d.name,
                            }),
                          )
                    }
                    loading={isFetching}
                    searchable
                    clearable
                    {...field}
                  />
                  <Text size="xs" mt={4} c="red.7" fw={500}>
                    {formState.errors.clientId?.message}
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
        New
      </Button>
    </>
  );
};

export default ProjectModal;
