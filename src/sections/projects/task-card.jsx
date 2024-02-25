import React from 'react';
import PropTypes from "prop-types";

import { Card, CardContent, Typography } from '@mui/material';

const TaskCard = ({ task }) => (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {task.status}
        </Typography>
      </CardContent>
    </Card>
  );

export default TaskCard;
TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
  }