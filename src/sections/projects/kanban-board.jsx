import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Grid, Modal, Paper, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import TaskDragModal from "./task-drag-modal";

const KanbanBoard = ({ project, projectId }) => {
  const router = useRouter();
  const [stages, setStages] = useState(['ToDo', 'InProgress', 'Done']);
  const [tasks, setTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState();
  const [showDragModal, setShowDragModal] = useState(false);


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
  // console.log(tasks);


  const handleTaskClick = (taskId) => {
    // Open task details modal
    router.push(`/tasks/${taskId}`);
  };

  const handleCloseModal = () => {
    setShowDragModal(false);
  };

  const onDragStart = (result) => {
    const { draggableId } = result;
    setDraggedTask(draggableId);
  };

  const onDragEnd = (result) => {
    setShowDragModal(true);

    const { destination, source } = result;
    // setDraggedTask(null);
    console.log(destination);
    // console.log(source);
    if (!destination) {
      return;
    }
    console.log(draggedTask);
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }


    // Reorder tasks in the same stage
    const updatedTasks = Array.from(tasks);
    console.log(tasks?.find((task) => task.task_id === draggedTask));
    console.log(updatedTasks);
    const [removedTask] = updatedTasks[source.droppableId].splice(source.index, 1);
    console.log([removedTask]);
    updatedTasks[destination.droppableId].splice(destination.index, 0, removedTask);




    setTasks(updatedTasks);
  };

  const handleConfirmModal = (result) => {
        // Update tasks in the database
    // Implement your API call to update the tasks
    // For example:
    fetch(`${VITE_BACKEND_API_URL}tasks/stage/${draggedTask}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => response.json())
      .then(data => console.log('Updated tasks:', data))
      .catch(error => console.error('Error updating tasks:', error));
    setShowDragModal(false);
  }

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
                                    margin: '6px',
                                      '--task-borderWidth': '3px',
                                      border: 'var(--task-borderWidth) dashed',
                                      borderColor: 'divider',
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
        <TaskDragModal
          open={showDragModal}
          onConfirm={handleConfirmModal}
          onCancel={handleCloseModal}
        />
      </div>
    </DragDropContext>
  );
};

KanbanBoard.propTypes = {
  project: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired,
}

export default KanbanBoard;