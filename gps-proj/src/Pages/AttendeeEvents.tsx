import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
  Space,
  Modal,
} from "@mantine/core";
import {
  useState,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

import HeaderDemo from "../Components/header";
import { Link } from "react-router-dom";

function AttendeeEventTiles(props: {
  head:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  description:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  attendees:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  organizer:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const [opened, setOpened] = useState(false);
  return (
    
    <div>
      <HeaderDemo/>
      <Space h="xl" />
      <Space w="xl" />
      <Card
        withBorder
        shadow="sm"
        p="lg"
        styles={{ padding: "20px" }}
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0],
        })}
      >
        <Card.Section>
          {/* <Image src="./image.png" height={160} alt="Norway" /> */}
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{props.head}</Text>
          <Badge color="red" variant="outline">
            On Sale
          </Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {/* Name: {props.name} {<br/>}  */}
          Description: {props.description} {<br />}
          Attendees: {props.attendees} {<br />}
          Organizer: {props.organizer} {<br />}
        </Text>

        <Button
           variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          onClick={() => setOpened(true)}
        >
          View Slots and Attendence
        </Button>
      </Card>

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
        title="View:"
      >
        <Link to="AttendeeSlots">
        <Button
          color="violet"
          radius="xl"
          size="md"
          style={{ margin: "0 36%", justifySelf:'center'}}
          
        >
          Slots
        </Button>
        </Link>
        <Space h={20}/>

        <Link to="AttendeeAttendence">
        <Button
          color="violet"
          radius="xl"
          size="md"
          style={{ margin: "0 30%", justifySelf:'center'}}
        >
          Attendence
        </Button>
        </Link>
      </Modal>
    </div>
  );
}
export default AttendeeEventTiles;
