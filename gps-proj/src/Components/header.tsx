import {
  Menu,
  Divider,
  Text,
  Modal,
  useMantineTheme,
  TextInput,
  Button,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  Settings,
  Search,
  Photo,
  MessageCircle,
  Trash,
  ArrowsLeftRight,
} from "tabler-icons-react";
import { useState } from "react";

function HeaderDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      classCode: "",
    },
  });

  return (
    <>
      <Menu
        shadow="xl"
        transition="rotate-right"
        transitionDuration={100}
        transitionTimingFunction="ease"
      >
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          onClick={() => setOpened(true)}
          icon={<Settings size={14} />}
        >
          Join Class
        </Menu.Item>
        <Menu.Item icon={<MessageCircle size={14} />}>Events</Menu.Item>
        <Menu.Item icon={<Photo size={14} />}>Gallery</Menu.Item>
        <Menu.Item
          icon={<Search size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<ArrowsLeftRight size={14} />}>
          Transfer my data
        </Menu.Item>
        <Menu.Item color="red" icon={<Trash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu>

      <Modal
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            placeholder="Enter Class Code"
            label="Join Class"
            radius="xl"
            required
            {...form.getInputProps("classCode")}
          />
          <Group position="right" mt="md">
            <Button radius={"xl"} type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default HeaderDemo;
