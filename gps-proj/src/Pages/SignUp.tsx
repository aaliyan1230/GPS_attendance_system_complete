import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Paper,
  Text,
  Center,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { PasswordInput } from "@mantine/core";
import { Container } from "@mantine/core";
import { Link } from "react-router-dom";

function SignUp() {
  // const [valuePass, setValuePass] = useState('');
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      pass: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Center style={{ width: 400, height: 200 }}>
        <Paper>
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "blue", to: "teal", deg: 45 }}
            size="xl"
            weight={900}
            style={{ fontFamily: "Greycliff CF, sans-serif", margin: 0 }}
          >
            Sign Up / Login
          </Text>
        </Paper>
      </Center>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <TextInput
            required
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps("username")}
          />

          <PasswordInput
            placeholder="Password"
            label="Password"
            description="Password should include at least one letter, number and special character"
            required
            {...form.getInputProps("pass")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
        <Group position="center" mt="md">
        <Link to="/AttendeeEvents">
          <Button>Proceed</Button>
        </Link>
        
        <Link to="/OrganizerEvents">
          <Button>Proceed as Org</Button>
        </Link>
        </Group>
      </Box>
    </Container>
  );
}

export default SignUp;
