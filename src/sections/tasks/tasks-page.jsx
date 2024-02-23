import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';


import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { List, GridOn } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import { Grid, Card, Divider, Container, IconButton } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

import NoData from './no-data';
import TaskCard from './task-card';
// import TaskSort from './task-sort';
import TaskFilters from './task-filters';
// import TaskService from './services/TaskService'; // Assuming you have a service to handle API calls
import TaskDeleteModal from './task-delete';


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

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(6);

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
    const filterTasks = (taskList) => {
      if (filterStatus === '') {
        setFilteredTasks(taskList);
      } else {
        setFilteredTasks(taskList.filter(task =>
          task.status === filterStatus
        ));
      }
    };
    if (searchQuery.trim() === '') {
      filterTasks(tasks);
    } else {
      filterTasks(tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
    setPage(0);
    // });
  }, [filterStatus, searchQuery, tasks]);

  useEffect(() => {
    if (filterStatus === '') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task =>
        task.status === filterStatus
      ));
    }
    setPage(0);
  }, [filterStatus, tasks]);


  const fetchTasks = async () => {
    try {
      const response = await fetch('https://work-app-backend.onrender.com/api/tasks', {
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

  // const filterTasks = (taskList) => {
  //   if (filterStatus === '') {
  //     setFilteredTasks(taskList);
  //   } else {
  //     setFilteredTasks(taskList.filter(task =>
  //       task.status === filterStatus
  //     ));
  //   }
  // };

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

      try {
        const response = await fetch(`https://work-app-backend.onrender.com/api/tasks/${selectedTask}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          // Task updated successfully, navigate to task details page
          // You can use useHistory() to navigate or any other navigation method
          router.push('/tasks');
          // console.log(formData)
        } else {
          console.error('Failed to Delete task');
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const notFound = !filteredTasks.length;
  return (
    <Container>
      <Card>
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
            <Stack direction='row' sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton onClick={() => handleViewChange('grid')}>
                 <GridOn />
              </IconButton>
              <IconButton onClick={() => handleViewChange('list')}>
                <List />
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
                            {/* <SortIcon /> */}
            </Stack>
          </Stack>
        </Toolbar>
      </Card>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ mt: 2 }}>
        {/* Task cards */}
        {view === 'grid' ? (
          <Grid container spacing={2}>
            {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
              <Grid item key={task.task_id} xs={12} sm={6} md={4}>
                <TaskCard
                  task={task}
                  onClick={() => handleCardClick(task.task_id)}
                  onEdit={() => handleEditTask(task.task_id)}
                  onDelete={() => handleDeleteTask(task.task_id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
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
        {notFound && <NoData query={searchQuery} />}
        <Card sx={{my:2}}><TablePagination
          page={page}
          component="div"
          count={filteredTasks.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[6, 12, 24]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /></Card>

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
