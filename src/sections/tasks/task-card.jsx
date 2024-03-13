import React from 'react';
import PropTypes from "prop-types";

import { Card, Button, Typography, CardContent } from '@mui/material';

const TaskCard = ({ task, onClick, onEdit, onDelete }) =>
   (
    <Card>
      <CardContent>
        <Typography onClick={onClick} sx={{cursor: 'pointer'}} variant="h4" component="div">
          {task.task_title}
        </Typography>
        {/* <Typography variant="body2">{task.task_desc}</Typography> */}
        <Typography variant="h6" component="div">
          {task.stage}
        </Typography>
        <Typography variant="h6" component="div">
          {task.status}
        </Typography>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </CardContent>
    </Card>
  );

export default TaskCard;

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
