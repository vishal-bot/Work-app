import { useState, useEffect } from 'react';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Box, Select, Button, MenuItem, TextField, Typography, InputLabel, FormControl, Autocomplete, } from '@mui/material';

import Iconify from 'src/components/iconify';

import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';

export default function AddTaskPage() {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assigned_to: '',
  });

  useEffect(() => {
    // Fetch task data based on taskId
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('https://work-app-backend.onrender.com/api/team', {
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
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // const handleAssignToChange = (event) => {
  //   setTask((prevTask) => ({
  //     ...prevTask,
  //     assignedTo: event.target.value,
  //   }));
  // };
  const handleAssignToChange = (e, values) => {
    const selectedIds = values.map(value => value.member_id);
    setTask({ ...task, assigned_to: selectedIds?.toString() });
    // console.log(formData)
  };

  const handleAddTask = async (e) => {
    // Logic to add the task (replace with actual API call)

    e.preventDefault();
    try {
      const response = await fetch('https://work-app-backend.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        // Task added successfully, navigate to tasks page
        // Reset the form after adding the task
        console.log('New Task:', task);
        setTask({
          title: '',
          description: '',
          status: '',
          priority: '',
          assigned_to: '',
        });
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
      <Tooltip title="Back">
          <IconButton component={RouterLink} href="/tasks">
          <Iconify sx={{height:32 , width:32 }} icon="ion:arrow-back" />
          </IconButton>
        </Tooltip>
      <Typography variant="h4">Add New Task</Typography>
      <form onSubmit={handleAddTask}>
        <TextField
          fullWidth
          name="title"
          value={task.title}
          onChange={handleChange}
          label="Title"
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          name="description"
          value={task.description}
          onChange={handleChange}
          label="Description"
          variant="outlined"
          margin="normal"
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={task.status} onChange={handleChange}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="InActive">InActive</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Priority</InputLabel>
          <Select name="priority" value={task.priority} onChange={handleChange}>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
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
        <Button type='submit' variant="contained" color="primary">
          Add Task
        </Button>
      </form>
    </Box>
  );
}
