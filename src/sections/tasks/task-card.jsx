import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const TaskCard = ({ task, onClick, onEdit, onDelete }) => {
  return (
    <Card >
      <CardContent>
        <Typography onClick={onClick} sx={{cursor: 'pointer'}} variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
