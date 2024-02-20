import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function AppSideFiller({ title, icon, subheader, ...other }) {
    // const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'));
    const upXs = useResponsive('up', 'sm', 'xs');
    return (
        <Card {...other}>
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
                    {icon && <Box sx={{ transform: !upXs ? 'rotate(90deg)' : 'none', }}>{icon}</Box>}
                </Box>
                {/* <Typography variant="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. reprehenderit qui officiis facilis quis laborum natus dolore?</Typography> */}

                {/* {list.map((site) => (
          <Paper
            key={site.name}
            variant="outlined"
            sx={{ py: 2.5, textAlign: 'center', borderStyle: 'dashed' }}
          >
            <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

            <Typography variant="h6">{fShortenNumber(site.value)}</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {site.name}
            </Typography>
          </Paper>
        ))} */}
            </Box>
        </Card>
    );
}

AppSideFiller.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    icon: PropTypes.object,
};
