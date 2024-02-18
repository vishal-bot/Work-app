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

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, Box, Divider, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';

// Sample task data (replace with actual task data from your API)
const sampleTaskData = {
  task_id: 1,
  title: 'Complete Project Proposal',
  description: 'Draft a detailed project proposal for the upcoming software release.',
  status: 'In Progress',
  priority: 'High',
  assigned_to: [{name: 'John Doe'}], // List of assigned team members
};

// Sample team member data (replace with actual team member data from your API)
const sampleTeamMemberData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  // Add more team members as needed
];

export default function EditTaskPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState([]);

  useEffect(() => {
    // Fetch task details based on taskId (replace with actual API call)
    setTask(sampleTaskData);

    // Fetch team member details (replace with actual API call)
    setTeamMembers(sampleTeamMemberData);

    if(task) {setAssignedTo(task.assigned_to)}
  }, [taskId, task]);
  

  const handleChangeTitle = (event) => {
    setTask((prevTask) => ({ ...prevTask, title: event.target.value }));
  };

  const handleChangeDescription = (event) => {
    setTask((prevTask) => ({ ...prevTask, description: event.target.value }));
  };

  const handleChangeStatus = (event) => {
    setTask((prevTask) => ({ ...prevTask, status: event.target.value }));
  };

  const handleChangePriority = (event) => {
    setTask((prevTask) => ({ ...prevTask, priority: event.target.value }));
  };

  const handleAssignTask = () => {
    // Logic to assign task to selected team members (replace with actual API call)
    console.log('Assigned to:', assignedTo);
  };

  return (
    <Box>
      {task && (
        <Box>
          <Typography variant="h4">Edit Task</Typography>
          <TextField
            fullWidth
            value={task.title}
            onChange={handleChangeTitle}
            label="Title"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            value={task.description}
            onChange={handleChangeDescription}
            label="Description"
            variant="outlined"
            margin="normal"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select value={task.status} onChange={handleChangeStatus}>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Priority</InputLabel>
            <Select value={task.priority} onChange={handleChangePriority}>
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
            value={assignedTo}
            onChange={(event, newValue) => {
              setAssignedTo(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Assigned To" variant="outlined" />}
          />

          <Button onClick={handleAssignTask} variant="contained" color="primary">
            Assign Task
          </Button>
        </Box>
      )}
    </Box>
  );
}


