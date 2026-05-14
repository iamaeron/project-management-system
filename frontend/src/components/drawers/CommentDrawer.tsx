import { ActionIcon, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AppTooltip from "../app/AppTooltip";
import { MessageCircle } from "lucide-react";

const CommentDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        position="right"
        title="Comments"
      >
        hey
        {/* Drawer content */}
      </Drawer>

      <AppTooltip label="Comments">
        <ActionIcon onClick={open} size="md" variant="subtle" color="gray">
          <MessageCircle size={22} />
        </ActionIcon>
      </AppTooltip>
    </>
  );
};

export default CommentDrawer;
