// import React from 'react';
import { Outlet } from "react-router-dom"

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

// import TaskMainPage from '../tasks-page';
// ----------------------------------------------------------------------

export default function TasksView() {

  const router = useRouter();
  const handleAddTask = () => {
    router.push('/tasks/addTask');
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Tasks</Typography>

        <Button variant="contained" color="inherit" onClick={handleAddTask} startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Task
        </Button>
      </Stack>
      {/* <TaskList tasks={tasks} setTasks={setTasks} /> */}
      <Outlet />
      {/* <TaskMainPage /> */}
    </Container>
  );
}
