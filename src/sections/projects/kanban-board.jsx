import React, { useState } from 'react';
import PropTypes from "prop-types";
// import { makeStyles } from '@mui/material/styles';
import { Grid, Paper, Typography, Button, TextField } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     minHeight: 200,
//   },
//   stage: {
//     padding: theme.spacing(1),
//     marginBottom: theme.spacing(2),
//     backgroundColor: '#f0f0f0',
//   },
// }));

const KanbanBoard = () => {
  // const  = useStyles();
  const [stages, setStages] = useState(['To Do', 'In Progress', 'Done']);
  const [newStage, setNewStage] = useState('');
  const [tasks, setTasks] = useState([{ id: 'task-1', title: 'Task 1', status: 'To Do' }, { id: 'task-2', title: 'Task 2', status: 'In Progress' }, { id: 'task-3', title: 'Task 3', status: 'Done'}]);

  const handleDragEnd = (result) => {
    // Handle the reordering of tasks here
  };

  const handleCreateStage = () => {
    if (newStage) {
      setStages([...stages, newStage]);
      setNewStage('');
    }
  };

  return (
    <div>
      <Grid container spacing={3}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {stages.map((stage, index) => (
            <Grid item xs={4} key={stage}>
              <Paper>
                <Typography variant="h6" gutterBottom>
                  {stage}
                </Typography>
                <Droppable droppableId={stage}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {tasks.map((task, i) => (
                        task.status === stage && (
                          <Draggable key={task.id} draggableId={task.id} index={i}>
                            {(provide) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Paper>
                                  {task.title}
                                </Paper>
                              </div>
                            )}
                          </Draggable>
                        )
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </DragDropContext>
      </Grid>
      <TextField
        label="New Stage"
        value={newStage}
        onChange={(e) => setNewStage(e.target.value)}
      />
      <Button variant="contained" onClick={handleCreateStage}>Create Stage</Button>
    </div>
  );
};

export default KanbanBoard;
KanbanBoard.propTypes = {
    tasks: PropTypes.object.isRequired,
  }