import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Flex, Stack } from "@mantine/core";
import { PlusIcon } from "lucide-react";

const ClientModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

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
        <Stack gap={14}>
          <TextInput label="Name" required />
          <TextInput label="Email" required />
        </Stack>

        <Flex align="center" justify="flex-end" gap={6} mt={20}>
          <Button onClick={close} variant="subtle">
            Cancel
          </Button>
          <Button>Add</Button>
        </Flex>
      </Modal>

      <Button leftSection={<PlusIcon size={16} />} onClick={open}>
        Add
      </Button>
    </>
  );
};

export default ClientModal;
