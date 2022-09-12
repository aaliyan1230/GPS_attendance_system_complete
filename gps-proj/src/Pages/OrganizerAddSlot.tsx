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

import AttendeeEventTiles from "./AttendeeEvents";

 function OrgAddEvent() {

const form = useForm({
    initialValues: {
      Name: '',
      Description: '',
      Organizer: ''
    }
})

function FunAddEventOrg (props: {Name : | string; Description : | string; Organizer: |string;  }){
  return(
      <AttendeeEventTiles head={props.Name} description={props.Description} attendees={0} organizer={props.Organizer} />
  )
}

return (
    
    <Box sx={{ maxWidth: 300 }} mx="auto">
    <form onSubmit={form.onSubmit((values) => FunAddEventOrg(values))}>
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

)
}

export default OrgAddEvent