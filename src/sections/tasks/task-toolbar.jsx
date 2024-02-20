import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import TaskFilters from './task-filters';
// ----------------------------------------------------------------------

export default function TaskToolbar({ filterName, onFilterName, openFilter, handleOpenFilter, handleCloseFilter }) {
    return (
        <Toolbar
            sx={{
                height: 96,
                display: 'flex',
                justifyContent: 'space-between',
                p: (theme) => theme.spacing(0, 1, 0, 3),
            }}
        >
            <OutlinedInput
                value={filterName}
                onChange={onFilterName}
                placeholder="Search user..."
                startAdornment={
                    <InputAdornment position="start">
                        <Iconify
                            icon="eva:search-fill"
                            sx={{ color: 'text.disabled', width: 20, height: 20 }}
                        />
                    </InputAdornment>
                }
            />

            {/* <Tooltip title="Filter list"> */}
                {/* <IconButton> */}
                    {/* <Iconify icon="ic:round-filter-list" /> */}
                    <TaskFilters
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                    />
                {/* </IconButton> */}
            {/* </Tooltip> */}
        </Toolbar>
    );
}

TaskToolbar.propTypes = {
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    openFilter: PropTypes.bool,
    handleOpenFilter: PropTypes.func,
    handleCloseFilter: PropTypes.func,
};
