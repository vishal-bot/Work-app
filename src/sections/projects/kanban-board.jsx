import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Grid, Modal, Paper, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'src/routes/hooks';

const KanbanBoard = ({ project, projectId }) => {
  const router = useRouter();
  const [stages, setStages] = useState(['ToDo', 'InProgress', 'Done']);
  const [tasks, setTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const { VITE_BACKEND_API_URL } = import.meta.env;


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_API_URL}project/tasks/${projectId}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    // Fetch tasks from the database
    fetchTasks();
  }, [VITE_BACKEND_API_URL, projectId]);
  console.log(tasks);


  const handleTaskClick = (taskId) => {
    // Open task details modal
    router.push(`/tasks/${taskId}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const onDragStart = (result) => {
    const { draggableId } = result;
    setDraggedTask(draggableId);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    setDraggedTask(null);

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Reorder tasks in the same stage
    const updatedTasks = Array.from(tasks);
    const [removedTask] = updatedTasks[source.droppableId].splice(source.index, 1);
    updatedTasks[destination.droppableId].splice(destination.index, 0, removedTask);

    // Update tasks in the database
    // Implement your API call to update the tasks
     // Update tasks in the database
  // Implement your API call to update the tasks
  // For example:
  // fetch(`${VITE_BACKEND_API_URL}/updateTasks`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(updatedTasks),
  // })
  // .then(response => response.json())
  // .then(data => console.log('Updated tasks:', data))
  // .catch(error => console.error('Error updating tasks:', error));


    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div>
        <Grid container spacing={2}>
          {stages.map((stage, i) => (
            <Grid item xs={4} key={stage}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {stage}
                </Typography>
                <Droppable droppableId={stage} key={stage}>
                  {(provided, dragSnapshot) => (
                    <Paper
                      ref={provided.innerRef}
                      sx={{
                        backgroundColor: dragSnapshot.isDraggingOver ? 'lightblue' : 'inherit',
                        minHeight: '100px',
                        padding: '8px',
                      }}
                    >
                      {tasks.map((task, index) => {
                        if (task.stage === stage) {
                          return (
                            <Draggable draggableId={task.task_id.toString()} key={task.task_id} index={index}>
                              {(provide, snapshot) => (
                                <Paper
                                  ref={provide.innerRef}
                                  {...provide.draggableProps}
                                  {...provide.dragHandleProps}
                                  onClick={() => handleTaskClick(task.task_id)}
                                  sx={{
                                    backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
                                    padding: '6px',
                                    margin: '4px',
                                  }}
                                >
                                  <Typography>{task.task_title}</Typography>
                                </Paper>
                              )}
                            </Draggable>
                          );
                        }
                          return null;
                      })}
                      {provided.placeholder}
                    </Paper>
                  )}
                </Droppable>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Modal open={showModal} onClose={handleCloseModal}>
          <div>
            <Typography variant="h5">Confirmation</Typography>
            <Typography variant="body1">Are you sure you want to move this task?</Typography>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Confirm</Button>
          </div>
        </Modal>
      </div>
    </DragDropContext>
  );
};

KanbanBoard.propTypes = {
  project: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
}

export default KanbanBoard;
