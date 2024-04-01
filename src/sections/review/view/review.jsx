
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { Box, Grid, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';



import Iconify from 'src/components/iconify';

import UserUpdates from '../user-updates';

// ----------------------------------------------------------------------

export default function ReviewView() {


  return (
    <Container maxWidth="xl">
      <Stack direction='row' sx={{ mb: 5 }}>
        <Tooltip title="Back">
          <IconButton component={RouterLink} href="/">
            <Iconify sx={{ height: 32, width: 32 }} icon="ion:arrow-back" />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" sx={{ ml: 1 }}>
          Review
        </Typography>
      </Stack>
      {/* <Stack sx={{m:5}}><ReviewDetails /></Stack> */}
      <Box>
        <Grid container spacing={2}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <UserUpdates /> 
          </Grid>
        </Grid>
      </Box>


    </Container>
  );
}
