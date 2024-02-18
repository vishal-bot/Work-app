import React from 'react';
import { Modal, Button } from '@mui/material';

const TaskDeleteModal = ({ open, onConfirm, onCancel }) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <div>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this task?</p>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={onCancel}>No</Button>
      </div>
    </Modal>
  );
};

export default TaskDeleteModal;
