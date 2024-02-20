import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { Grid, Select, Divider, MenuItem, TextField, InputLabel, IconButton, FormControl, Container, Card } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from '@mui/material/Toolbar';

import Iconify from 'src/components/iconify';

import { useRouter } from 'src/routes/hooks';

import TaskCard from './task-card';
// import TaskService from './services/TaskService'; // Assuming you have a service to handle API calls
import TaskDeleteModal from './task-delete';
import TaskFilters from './task-filters';
import TaskToolbar from './task-toolbar';


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

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

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
  });
  // }, [searchQuery, tasks]);

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
      const response = await fetch('https://work-app-backend.onrender.com/tasks', {
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
    router.push(`/tasks/edit/${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    setSelectedTask(taskId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // await TaskService.deleteTask(selectedTask);
      console.log(selectedTask);
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

  // const handleAddTask = () => {
  //   router.push('/tasks/add');
  // }

  return (
    <Container>
      {/* <Button onClick={handleAddTask}>Add</Button> */}
      <Card>
        {/* <Stack direction='row' spacing={3} justifyContent="flex-start"
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
        <FormControl>
          <InputLabel variant='outlined' shrink>Filter</InputLabel>
          <Select value={filterStatus} displayEmpty onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="InActive">InActive</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={() => handleViewChange('grid')}>
          <GridOn />
        </IconButton>
        <IconButton onClick={() => handleViewChange('list')}>
          <List />list
        </IconButton>
        <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <TaskFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>
      </Stack> */}
        <Toolbar
          sx={{
            height: 96,
            display: 'flex',
            justifyContent: 'space-between',
            p: (theme) => theme.spacing(0, 1, 0, 3),
          }}
        >
          <OutlinedInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap-reverse"
            justifyContent="flex-end"
            spacing={2}
          >
            <Stack direction='row' sx={{ display: {xs: 'none', sm: 'block'}}}>
              <IconButton onClick={() => handleViewChange('grid')}>
                {/* <GridOn /> */} Grid
              </IconButton>
              <IconButton onClick={() => handleViewChange('list')}>
                {/* <List /> */} List
              </IconButton>
            </Stack>

            <Stack direction="row" flexShrink={0} sx={{ my: 1 }}>
              <TaskFilters
                openFilter={openFilter}
                onOpenFilter={handleOpenFilter}
                onCloseFilter={handleCloseFilter}
                filterStatus={filterStatus}
                handleFilterChange={handleFilterChange}
              />
            </Stack>
          </Stack>
        </Toolbar>
      </Card>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ mt: 2 }}>
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
          <Grid container spacing={2}>
            {filteredTasks.map((task) => (
              <Grid item key={task.id} xs={12} sm={12} md={12}>
                <TaskCard
                  task={task}
                  onClick={() => handleCardClick(task.id)}
                  onEdit={() => handleEditTask(task.id)}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <TaskDeleteModal
          open={showDeleteModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </Stack>
    </Container>
  );
};

export default TaskMainPage;
