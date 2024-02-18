import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './task-card';
// import TaskService from './services/TaskService'; // Assuming you have a service to handle API calls
import TaskDeleteModal from './task-delete';
import Stack from '@mui/material/Stack';
import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, IconButton, Divider } from '@mui/material';
import { useRouter } from 'src/routes/hooks';

// import { GridOn, List } from '@mui/icons-material';

const TaskMainPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [filter, setFilter] = useState('');
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      filterTasks(tasks);
    } else {
      filterTasks(tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, tasks]);

  useEffect(() => {
    if (filterStatus === '') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task =>
        task.status === filterStatus
      ));
    }
  }, [filterStatus, tasks]);


  const fetchTasks = async () => {
    try {
      const response = await fetch('data.json', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const filterTasks = (taskList) => {
    if (filterStatus === '') {
      setFilteredTasks(taskList);
    } else {
      setFilteredTasks(taskList.filter(task =>
        task.status === filterStatus
      ));
    }
  };

  const handleCardClick = (taskId) => {
    router.push(`/tasks/${taskId}`);
  };

  const handleEditTask = (taskId) => {
    console
    router.push(`/tasks/edit/${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    setSelectedTask(taskId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // await TaskService.deleteTask(selectedTask);
      setShowDeleteModal(false);
      fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCancelDelete = () => {
    setSelectedTask(null);
    setShowDeleteModal(false);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleViewChange = (viewType) => {
    setView(viewType);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddTask = () => {
    router.push('/tasks/add');
  }

  return (
    <Stack>
      <button onClick={handleAddTask}>Add</button>
      <Stack direction='row' spacing={3} justifyContent="flex-start"
        alignItems="flex-start" sx={{ mb: 2 }}>
        <TextField
          placeholder="Search tasks"
          value={searchQuery}
          onChange={handleSearchChange}
        // InputProps={{
        //   endAdornment: (
        //     <IconButton onClick={fetchTasks} sx={{ p: '10px' }}>
        //       <SearchIcon />
        //     </IconButton>
        //   )
        // }}
        />
        <FormControl sx={{ minWidth: 130 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filterStatus} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={() => handleViewChange('grid')}>
          {/* <GridOn /> */}grid
        </IconButton>
        <IconButton onClick={() => handleViewChange('list')}>
          {/* <List /> */}list
        </IconButton>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{mt:2}}>
        {/* Task cards */}
        {view === 'grid' ? (
          <Grid container spacing={2}>
            {filteredTasks.map((task) => (
              <Grid item key={task.id} xs={12} sm={6} md={4}>
                <TaskCard
                  task={task}
                  onClick={() => handleCardClick(task.id)}
                  onEdit={() => handleEditTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => handleCardClick(task.id)}
              onEdit={() => handleEditTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        )}


        {/* <Grid container spacing={3}>
        {filteredTasks.map((task) => (
          <Grid item key={task.id} xs={12} sm={6} md={4}>
            <TaskCard
              task={task}
              onClick={() => handleCardClick(task.id)}
              onEdit={() => handleEditTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
              view={view}
            />
          </Grid>
        ))}
      </Grid> */}

        <TaskDeleteModal
          open={showDeleteModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Stack>
    </Stack>
  );
};

export default TaskMainPage;
