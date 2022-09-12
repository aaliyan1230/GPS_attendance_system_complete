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
import { Flask } from "tabler-icons-react";

import HeaderDemo from "../Components/header";

function AttendeeEventSlots(props: {
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
  const [attendence, setAttendence] = useState(false);

  function markAttendence() {
    setAttendence(true);
    return console.log("Attendence Marked");
  }
  // function notBadge(){
  //     return(
  //     <Badge color="red" variant="outline">
  //     Attendence Not Open
  //   </Badge>
  //     )
  // }

  // function DisableBadge(props:{attStatus: boolean;}){

  //     if (props.attStatus === false){
  //         return(
  //             <>
  //             <Badge color="red" variant="outline">
  //     Attendence Not Open
  //   </Badge>
  //   </>
  //         )

  return (
    <div>
      <HeaderDemo />
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

          <Group>
            {" "}
            <Badge hidden color="red" variant="outline">
              Attendence Not Open
            </Badge>
            <Badge
              onClick={() => setAttendence(false)}
              color="green"
              variant="outline"
            >
              Attendence Open
            </Badge>
          </Group>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {/* Name: {props.name} {<br/>}  */}
          Start Time: {props.description} {<br />}
          End Time: {props.attendees} {<br />}
          Credit Hours: {props.organizer} {<br />}
        </Text>

        <Button
          className="markAttendence"
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
          disabled={attendence}
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          onClick={() => markAttendence()}
        >
          Mark Attendence
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
        <Button
          color="violet"
          radius="xl"
          size="md"
          style={{ margin: "0 36%", justifySelf: "center" }}
        >
          Slots
        </Button>
        <Space h={20} />
        <Button
          color="violet"
          radius="xl"
          size="md"
          style={{ margin: "0 30%", justifySelf: "center" }}
        >
          Attendence
        </Button>
      </Modal>
    </div>
  );
}
export default AttendeeEventSlots;
