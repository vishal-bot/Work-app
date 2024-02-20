import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'];
export const STATUS_OPTIONS = ['Active', 'InActive', 'Completed'];


// ----------------------------------------------------------------------

export default function TaskFilters({ openFilter, onOpenFilter, onCloseFilter, filterStatus, handleFilterChange }) {
    const renderPriority = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Priority</Typography>
            <FormGroup>
                {PRIORITY_OPTIONS.map((item) => (
                    <FormControlLabel key={item} control={<Checkbox />} label={item} />
                ))}
            </FormGroup>
        </Stack>
    );

    const renderStatus = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Status</Typography>
            <RadioGroup>
                {/* {STATUS_OPTIONS.map((item) => (
                    <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                ))} */}
                <FormControlLabel value="Active" control={
                    <Radio
                        checked={filterStatus === 'Active'}
                        onChange={handleFilterChange}
                        value="Active"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }}
                    />} label="Active" />
                <FormControlLabel value="male" control={
                    <Radio checked={filterStatus === 'InActive'}
                        onChange={handleFilterChange}
                        value="InActive"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }} />} label="InActive" />
                <FormControlLabel value="other" control={
                    <Radio checked={filterStatus === 'Completed'}
                        onChange={handleFilterChange}
                        value="Completed"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': 'A' }} />} label="Completed" />
            </RadioGroup>
        </Stack>
    );


    return (
        <>
            <Button
                disableRipple
                color="inherit"
                endIcon={<Iconify icon="ic:round-filter-list" />}
                onClick={onOpenFilter}
            >
                Filters&nbsp;
            </Button>

            <Drawer
                anchor="right"
                open={openFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 280, border: 'none', overflow: 'hidden' },
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ px: 1, py: 2 }}
                >
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        Filters
                    </Typography>
                    <IconButton onClick={onCloseFilter}>
                        <Iconify icon="eva:close-fill" />
                    </IconButton>
                </Stack>

                <Divider />

                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        {renderPriority}

                        {renderStatus}

                    </Stack>
                </Scrollbar>

                <Box sx={{ p: 3 }}>
                    <Button
                        onClick={handleFilterChange}
                        fullWidth
                        size="large"
                        type="submit"
                        color="inherit"
                        variant="outlined"
                        startIcon={<Iconify icon="ic:round-clear-all" />}
                    >
                        Clear All
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}

TaskFilters.propTypes = {
    openFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    filterStatus: PropTypes.string,
    handleFilterChange: PropTypes.func,
};
