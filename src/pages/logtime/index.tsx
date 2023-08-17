// import React, { useState } from 'react';
// import { Grid, Tabs, Tab, Button } from '@mui/material';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid'
// import TaskList from 'src/components/TaskList.js';

// const CalendarWithTasks = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [events, setEvents] = useState([
//     { title: 'Catch up', date: '2023-07-24', time: '08:00' },
//     { title: 'Xero Client Call', date: '2023-07-24', time: '11:00' },
//     { title: 'Innovation Squads', date: '2023-07-17', time: '08:00' },
//     { title: 'CRO Meeting', date: '2023-07-17', time: '09:00' },
//     { title: 'Analytics Weekly', date: '2023-07-26', time: '14:00' },
//     { title: 'Cacth up', date: '2023-07-26', time: '15:00' },
//   ]);

//   const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <Grid container spacing={2}>
//       {/* Left box with tasks */}
//       <Grid item xs={12} md={4}>
//         <div>
//           <h2>Log Time</h2>
//           {/* Assuming TaskList component displays the content for different tabs */}
//           <Tabs value={activeTab} onChange={handleTabChange} aria-label="Allocated Tasks Tabs">
//             <Tab label="Allocated Tasks" />
//             <Tab label="All Tasks" />
//             <Tab label="Wolfgang" />
//           </Tabs>
//           <TaskList activeTab={activeTab + 1} />
//         </div>
        
//       </Grid>

//       {/* Right box with calendar */}
//       <Grid item xs={12} md={8}>
//         <div>
//           <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" weekends={false} events={events} />
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default CalendarWithTasks;


import React, { useState } from 'react';
import { Grid, Tabs, Tab, Button } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import TaskList from 'src/components/TaskList.js';

const CalendarWithTasks = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [events, setEvents] = useState([
    { title: 'Caseys Furniture - Social', date: '2023-07-24', time: '08:00' },
    { title: 'The Night Sky - PPC', date: '2023-07-24', time: '10:30' },
    { title: 'Innovation Squads', date: '2023-07-17', time: '13:45' },
    { title: 'HomeSecure - PPC', date: '2023-07-17', time: '11:00' },
    { title: 'Zurich Insurance - Analytics', date: '2023-07-26', time: '09:00' },
    { title: 'Littlewoods - PPC', date: '2023-07-26', time: '14:15' },
  ]);

  // Modify events to include both date and time in ISO 8601 format
  const formattedEvents = events.map((event) => ({
    title: event.title,
    start: `${event.date}T${event.time}:00`, // Format: "YYYY-MM-DDTHH:mm:00"
  }));

  const handleTabChange = (event: any, newValue: React.SetStateAction<number>) => {
    setActiveTab(newValue);
  };

  return (
    <Grid container spacing={2}>
      {/* Left box with tasks */}
      <Grid item xs={12} md={4}>
        <div>
          <h2>Log Time</h2>
          {/* Assuming TaskList component displays the content for different tabs */}
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="Allocated Tasks Tabs">
            <Tab label="Allocated Tasks" />
            <Tab label="All Tasks" />
            <Tab label="Wolfgang" />
          </Tabs>
          <TaskList activeTab={activeTab + 1} />
        </div>
        
      </Grid>

      {/* Right box with calendar */}
      <Grid item xs={12} md={8}>
        <div>
          <FullCalendar plugins={[dayGridPlugin, timeGridPlugin]} initialView="timeGridWeek" weekends={false} events={formattedEvents} />
        </div>
      </Grid>
    </Grid>
  );
};

export default CalendarWithTasks;
