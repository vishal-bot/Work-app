import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TasksView() {


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Tasks
      </Typography>
    </Container>
  );
}
