// import React from 'react';
import { Outlet } from "react-router-dom"

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import TaskMainPage from '../tasks-page';
// ----------------------------------------------------------------------

export default function TasksView() {
  // const [tasks, setTasks] = useState([]);

  // const getData = async () => {
  //   await fetch('data.json', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(myJson => {
  //       console.log(myJson); // Verify that data is fetched correctly
  //       setTasks(myJson); // Set the fetched data to the state
  //     });
  // };

  // useEffect(() => {
  //   getData(); // Fetch data when the component mounts
  // }, []);


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Tasks
      </Typography>
      {/* <TaskList tasks={tasks} setTasks={setTasks} /> */}
      <Outlet />
      {/* <TaskMainPage /> */}
    </Container>
  );
}
