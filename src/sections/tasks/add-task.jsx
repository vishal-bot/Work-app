import { useState } from 'react';

import { Box, Select, Button, MenuItem, TextField, Typography, InputLabel, FormControl, } from '@mui/material';

// Sample team member data (replace with actual team member data from your API)
const sampleTeamMemberData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  // Add more team members as needed
];

export default function AddTaskPage() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assignedTo: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAssignToChange = (event) => {
    setTask((prevTask) => ({
      ...prevTask,
      assignedTo: event.target.value,
    }));
  };

  const handleAddTask = () => {
    // Logic to add the task (replace with actual API call)
    console.log('New Task:', task);
    // Reset the form after adding the task
    setTask({
      title: '',
      description: '',
      status: '',
      priority: '',
      assignedTo: [],
    });
  };

  return (
    <Box>
      <Typography variant="h4">Add New Task</Typography>
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
          <MenuItem value="In Progress">In Progress</MenuItem>
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
        <InputLabel>Assigned To</InputLabel>
        <Select
          multiple
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleAssignToChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {sampleTeamMemberData.map((member) => (
            <MenuItem key={member.id} value={member.name}>
              {member.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleAddTask} variant="contained" color="primary">
        Add Task
      </Button>
    </Box>
  );
}
