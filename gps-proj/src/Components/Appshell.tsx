import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import AttendeeEventTiles from '../Pages/AttendeeEvents';

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 200 }}>
          <Text>Application navbar</Text>
        </Navbar>
      }
    
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        
        <Header height={70} p="md">
          
        </Header>
      }
    >
      {/* <Text>Resize app to see responsive navbar in action</Text> */}
      <AttendeeEventTiles  head="Stats" description="Statttttttt" attendees={50} organizer="Sir Dani"/>
    </AppShell>
  );
}