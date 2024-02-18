import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from '@mui/material';

const TaskDeleteModal = ({ open, onConfirm, onCancel }) => 
   (
    <Modal open={open} onClose={onCancel}>
      <div>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this task?</p>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={onCancel}>No</Button>
      </div>
    </Modal>
  );

export default TaskDeleteModal;

TaskDeleteModal.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};
