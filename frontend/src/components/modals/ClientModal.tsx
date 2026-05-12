import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Flex, Stack, Text } from "@mantine/core";
import { PlusIcon } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { clientSchema, type ClientSchemaData } from "@/lib/types/ClientSchema";
import { clientSchema, type ClientSchemaData } from "@shared/index";
import { postData } from "@/lib/fetcher";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ClientModal = () => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: zodResolver(clientSchema),
  });

  const onSubmit: SubmitHandler<ClientSchemaData> = async (data) => {
    const res = await postData("/clients/create", {
      ...data,
    });
    if (res.data.success) {
      toast(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
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
        title="New client"
        radius={8}
        size="md"
        style={{ borderRadius: "10px" }}
        transitionProps={{ transition: "fade-down", duration: 200 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={14}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div>
                  <TextInput label="Name" required {...field} />
                  <Text size="xs" mt={4} c="red.7" fw={500}>
                    {formState.errors.name?.message}
                  </Text>
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <TextInput label="Email" required {...field} />
                  <Text size="xs" mt={4} c="red.7" fw={500}>
                    {formState.errors.email?.message}
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
        Add
      </Button>
    </>
  );
};

export default ClientModal;
