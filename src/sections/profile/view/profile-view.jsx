
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

import ProfileDetails from '../profile-dtls';

// ----------------------------------------------------------------------

export default function ProfileView() {


    return (
        <Container>
            <Stack direction='row'>
            <Tooltip title="Back">
                <IconButton component={RouterLink} href="/">
                    <Iconify sx={{ height: 32, width: 32 }} icon="ion:arrow-back" />
                </IconButton>
            </Tooltip>
            <Typography variant="h4" sx={{textAlign: 'center', ml:1}}>
                Profile
            </Typography>
            </Stack>
            <Stack sx={{m:5}}><ProfileDetails /></Stack>
            
        </Container>
    );
}
