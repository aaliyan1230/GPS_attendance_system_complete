import {
    Card,
    Text,
    Badge,
    Button,
    Group,
    useMantineTheme,
    Space,
    Modal,
    TextInput,
    Box
 
  } from "@mantine/core";
  
  import { useForm } from '@mantine/form';
  import { Link } from "react-router-dom";

  import {
    useState,
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
  } from "react";
  
  import HeaderDemo from "../Components/header";
  import AttendeeEventTiles from "./AttendeeEvents";
  import OrgAddEvent from "./OrganizerAddSlot";
  
  function OrganizerEventTiles(props: {
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

    const form = useForm({
        initialValues: {
          Name: '',
          Description: '',
          Organizer: ''
        }
    })

    function AddEvent() {
        
        <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('Name')}
        />
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('Description')}
        />
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('Organizer')}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  
    }

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
            <Button radius="xl" color="red" variant="outline" >
              Add Event
            </Button>
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
        <Link to="OrganizerSlots">
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

          <Link to="OrganizerAttendenceView">
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
  export default OrganizerEventTiles;
  