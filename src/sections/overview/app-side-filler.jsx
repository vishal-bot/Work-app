import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

import { useResponsive } from 'src/hooks/use-responsive';


// ----------------------------------------------------------------------

export default function AppSideFiller({ title, icon, subheader, ...other }) {
    // const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
    const upXs = useResponsive('up', 'sm', 'xs');
    return (
        <Card {...other}>

            <CardContent sx={{textAlign: 'center'}}>
                <CardHeader title={title} subheader={subheader} />

                <Box
                    sx={{
                        p: 3,
                        gap: 2,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    }}
                >

                    <Box sx={{ mb: 0.5 }}>
                        {icon && <Box sx={{ transform: !upXs ? 'rotate(90deg)' : 'none',}}>{icon}</Box>}
                    </Box>
                    {/* <Typography variant="text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography> */}
                </Box>
            </CardContent>
        </Card>
    );
}

AppSideFiller.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    icon: PropTypes.object,
};
