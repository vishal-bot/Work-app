import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

export default function NoData({ query }) {
  return (
    <Card sx={{my:2}}>
      <CardContent align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Not found
          </Typography>

          <Typography variant="body2">
            No results found for &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Paper>
        </CardContent>
      </Card>
  );
}

NoData.propTypes = {
  query: PropTypes.string,
};
