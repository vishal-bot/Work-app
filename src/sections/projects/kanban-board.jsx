import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

import { useRouter } from 'src/routes/hooks';
// import { styled } from '@mui/material';
// import { makeStyles } from '@mui/material/styles';
import { Grid, Card, Paper, Stack, styled, Typography } from '@mui/material';

const useStyles = styled((theme) => ({
  boardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  column: {
    padding: theme.spacing(2),
  },
  columnHeader: {
    marginBottom: theme.spacing(1),
  },
  taskContainer: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
}));

const KanbanBoard = ({ project, projectId }) => {
  const router = useRouter();
  const classes = useStyles();


  // const  = useStyles();
  const [stages, setStages] = useState(['ToDo', 'InProgress', 'Done']);
  const [tasks, setTasks] = useState([]);

  const { VITE_BACKEND_API_URL } = import.meta.env;

  console.log(tasks);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_API_URL}project/tasks/${projectId}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchTasks();
  }, [VITE_BACKEND_API_URL, projectId]);



  const handleTaskClick = (taskId) => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <div>
      <Grid container spacing={1} sx={{
        '--Grid-borderWidth': '1px',
        border: 'var(--Grid-borderWidth) dashed',
        borderColor: 'divider',
      }}>
        {stages.map((stage, index) => (
          <Grid item xs={4} key={stage}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {stage}
              </Typography>
              {tasks.map((task, i) => (
                task.stage === stage && (
                  <Stack key={task.task_id} index={i}>
                    <Paper elevation={3} sx={{ p: 2, m: 1 }}>
                      <Typography>{task.task_title}</Typography>
                    </Paper>
                  </Stack>
                )
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default KanbanBoard;
KanbanBoard.propTypes = {
  project: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
}