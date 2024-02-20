// TaskDetailsPage.js
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Typography } from '@mui/material';

// const EditTaskPage = () => {
//   const { taskId } = useParams();

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Task Details
//       </Typography>
//       <Typography variant="body1">Task ID: {taskId}</Typography>
//       {/* Fetch task details data from the backend based on taskId and display */}
//     </Container>
//   );
// };

// export default EditTaskPage;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Select, Button, MenuItem, TextField, Typography, InputLabel, FormControl, Autocomplete } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
// Sample task data (replace with actual task data from your API)
const sampleTaskData = {
  task_id: 1,
  title: 'Complete Project Proposal',
  description: 'Draft a detailed project proposal for the upcoming software release.',
  status: 'In Progress',
  priority: 'High',
  assigned_to: [{ name: 'John Doe' }], // List of assigned team members
};

// Sample team member data (replace with actual team member data from your API)
const sampleTeamMemberData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  // Add more team members as needed
];

export default function EditTaskPage() {
  const router = useRouter();
  const { taskId } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  const [task, setTask] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assigned_to: '',
  });

  useEffect(() => {
    // Fetch task data based on taskId
    const fetchTask = async () => {
      try {
        const response = await fetch(`https://work-app-backend.onrender.com/api/tasks/${taskId}`);
        const data = await response.json();
        setTask(data[0]);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  },[taskId]);

 

  useEffect(() => {
    const fillFormData = () => {
      const data = task;
      setFormData({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        assigned_to: data.assigned_to,
      });
    }
    fillFormData();
  },[task]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://work-app-backend.onrender.com/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Task updated successfully, navigate to task details page
        // You can use useHistory() to navigate or any other navigation method
        router.push('/tasks');
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  return (
    <Box>
      {task && (
        <Box>
          <Typography variant="h4">Edit Task</Typography>
          <TextField
            fullWidth
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
            value={task.description}
            onChange={handleChange}
            label="Description"
            variant="outlined"
            margin="normal"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select value={task.status} onChange={handleChange}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="InActive">InActive</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Priority</InputLabel>
            <Select value={task.priority} onChange={handleChange}>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
            multiple
            options={teamMembers}
            getOptionLabel={(option) => option.name}
            // isOptionEqualToValue={(option) => option.value}
            value={formData.assigned_to_teamigned_to}
            onChange={(event, newValue) => {
              setFormData(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Assigned To" variant="outlined" />}
          />

          <Button onClick={handleSubmit} variant="contained" color="primary">
            Assign Task
          </Button>
        </Box>
      )}
    </Box>
  );
}


