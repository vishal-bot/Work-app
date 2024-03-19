import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { Modal, Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const TaskDragModal = ({ open, onConfirm, onCancel }) =>
(
  <Modal open={open} onClose={onCancel}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    closeAfterTransition
    slots={{ backdrop: Backdrop }}
    slotProps={{
      backdrop: {
        timeout: 500,
      },
    }}>
    <Fade in={open}>
      <Box sx={style}>
        <Typography id="transition-modal-title" variant="h6" component="h2">
        Confirm Move
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2 }}>
        Are you sure you want to Move this task?
        </Typography>
        <Button sx={{ mr: 1 }} variant="outlined" color="success" onClick={onConfirm}>Confirm</Button>
        <Button sx={{ ml: 1 }} variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Fade>
  </Modal >
);

export default TaskDragModal;

TaskDragModal.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};
