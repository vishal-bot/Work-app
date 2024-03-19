import { useState, useEffect } from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Grid, Box, Stack, Select, Button, MenuItem, TextField, Typography, InputLabel, FormControl, Autocomplete, } from '@mui/material';

import Iconify from 'src/components/iconify';

import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';

export default function AddTaskPage() {

  const { VITE_BACKEND_API_URL } = import.meta.env;


  const [selectedProject, setSelectedProject] = useState();
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);
  const [task, setTask] = useState({
    task_title: '',
    task_desc: '',
    stage: '',
    status: '',
    priority: '',
    assigned_to: '',
    project_id: '',
  });

  useEffect(() => {
    // Fetch task data based on taskId
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_API_URL}team/${sessionStorage.getItem('teamId')}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTeamMembers();
    // setTeamMembers(sampleTeamMemberData);
  }, [VITE_BACKEND_API_URL]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_API_URL}project/team/${sessionStorage.getItem('teamId')}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [VITE_BACKEND_API_URL]);

  const handleAssignToChange = (e, values) => {
    const selectedIds = values.map(value => value.member_id);
    setTask({ ...task, assigned_to: selectedIds?.toString() });
    // console.log(formData)
  };

  const handleAddTask = async (e) => {
    // Logic to add the task (replace with actual API call)
    console.log('New Task:', task);
    e.preventDefault();
    try {
      const response = await fetch(`${VITE_BACKEND_API_URL}tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        // Task added successfully, navigate to tasks page
        // Reset the form after adding the task

        setTask({
          task_title: '',
          task_desc: '',
          stage: '',
          status: '',
          priority: '',
          assigned_to: '',
          project_id: '',
        });
        setSelectedProject(null);
        router.push('/tasks');
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }

  };

  return (
    <Box>
      <Stack direction='row'>
      <Tooltip title="Back">
        <IconButton component={RouterLink} href="/tasks">
          <Iconify sx={{ height: 32, width: 32 }} icon="ion:arrow-back" />
        </IconButton>
      </Tooltip>
      <Typography variant="h4" sx={{ml:1}}>Add New Task</Typography></Stack>
      <form onSubmit={handleAddTask}>
        <Grid container sx={{m:2}} spacing={2} justifyContent='center'>
          <Grid xs={12} sm={8} md={8}>
            <TextField
              fullWidth
              name="task_title"
              value={task.task_title}
              onChange={handleChange}
              label="Title"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              name="task_desc"
              value={task.task_desc}
              onChange={handleChange}
              label="Description"
              variant="outlined"
              margin="normal"
            /></Grid>
          <Grid xs={12} sm={5} md={5}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Stage</InputLabel>
              <Select name="stage" value={task.stage} onChange={handleChange}>
                <MenuItem value="ToDo">ToDo</MenuItem>
                <MenuItem value="InProgress">InProgress</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl></Grid>
          <Grid xs={12} sm={4} md={4}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select name="status" value={task.status} onChange={handleChange}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="InActive">InActive</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={4} md={4}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Priority</InputLabel>
              <Select name="priority" value={task.priority} onChange={handleChange}>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={4} md={4}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <Autocomplete
                
                multiple
                options={teamMembers}
                getOptionLabel={(option) => option.name}
                value={teamMembers?.filter(member => task.assigned_to?.split(",")?.map(Number)?.includes(member.member_id))}
                onChange={handleAssignToChange}
                renderInput={(params) => <TextField {...params} label="Assigned To" variant="outlined" />}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={5} md={5}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <Autocomplete
                
                disablePortal
                options={projects.map((option) => option.project_name)}
                value={selectedProject}
                onChange={(event, newProject) => {
                  setSelectedProject(projects?.filter(project => project.project_name === newProject));
                  setTask({ ...task, project_id: selectedProject[0].project_id });
                }}
                renderInput={(params) => <TextField {...params} label="Project" />}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box textAlign='center'>
        <Button type='submit' variant="contained" color="primary">
          Add Task
        </Button></Box>
      </form>
    </Box>
  );
}
