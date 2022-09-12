import {  Button, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NavbarMinimal} from './Components/navbar';
import GetUserLocation from './Components/location';
import { Notification } from '@mantine/core';
import { Check, RecycleOff } from 'tabler-icons-react';
import HeaderDemo from './Components/header';
import AppShellDemo from './Components/Appshell';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import SignUp from './Pages/SignUp';
import AttendeeEventTiles from './Pages/AttendeeEvents';
import AttendeeEventSlots from './Pages/AttendeeSlots';
import ViewSlotAttendence from './Pages/AttendeeAttendence';
import OrganizerEventTiles from './Pages/OrganizerEvents';
import OrganizerEventSlots from './Pages/OrganizerSlots';
import OrganizerViewSlotAttendence from './Pages/OrganizerAttendenceView';


const App = () =>  {

  return(
    <div>

<BrowserRouter>
      <Routes>
        <Route path="/"  element={<SignUp />}/>

        <Route path="AttendeeEvents"  element={<AttendeeEventTiles head="Stats" description="Statttttttt" attendees={50} organizer="Sir Dani"/>}/>
        <Route path="AttendeeEvents/AttendeeSlots"  element={<AttendeeEventSlots head="12/12/2020" description="Statttttttt" attendees={50} organizer="Sir Dani"/>}/>
       <Route path="AttendeeEvents/AttendeeAttendence" element={<ViewSlotAttendence  />} />
        <Route path="OrganizerEvents"  element={<OrganizerEventTiles head="DBMS" description="normallll" attendees={5} organizer="Faasla"/>}/>
        <Route path="OrganizerEvents/OrganizerSlots"  element={<OrganizerEventSlots head="DBMS" description="normallll" attendees={5} organizer="Faasla"/>}/>
        <Route path="OrganizerEvents/OrganizerAttendenceView" element={<OrganizerViewSlotAttendence  />} />
        </Routes> 
    </BrowserRouter>
<GetUserLocation/>

      {/*<MantineProvider>
      
        {/* <SignUp /> */}
      
        {/* <AttendeeEventTiles head="Stats" description="Statttttttt" attendees={50} organizer="Sir Dani"/> */}
        {/* <AttendeeEventSlots head="Stats" description="Statttttttt" attendees={50} organizer="Sir Dani"/> */}
       
        
     
    {/* <NavbarMinimal></NavbarMinimal> */}


      

       {/* <GetUserLocation/> */}

      {/* <HeaderMenuColored links={[{"link": "hello", "label" : "hello", "links" : "link": "/about",
      "label": "Features" ]}></HeaderMenuColored> */}
  
      
 
    
    </div>
  )
}

export default App;
