// import React, { useState} from 'react';
import { Outlet } from 'react-router-dom';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

const ProjectView = () => {

 const handleAddProject = () => {
  // router.push('/tasks/addTask');
}
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Projects</Typography>
        <Button variant="contained" color="inherit" onClick={handleAddProject} startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Project
        </Button>
      </Stack>
      <Stack>
      <Outlet />
      </Stack>
    </Container>
  );
};

export default ProjectView;

