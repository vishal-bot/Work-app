// TaskDetailsPage.js
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Typography } from '@mui/material';

// const TaskDetailPage = () => {
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

// export default TaskDetailPage;

import {  useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box, List, Button, Divider, ListItem, TextField, Typography, ListItemText } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';

// Sample task data (replace with actual task data from your API)
const sampleTaskData = {
  task_id: 1,
  title: 'Complete Project Proposal',
  description: 'Draft a detailed project proposal for the upcoming software release.',
  status: 'In Progress',
  priority: 'High',
  assigned_to: 'John Doe', // Team member's name
};

// // Sample team member data (replace with actual team member data from your API)
// const sampleTeamMemberData = [
//   { id: 1, name: 'John Doe' },
//   { id: 2, name: 'Jane Smith' },
//   // Add more team members as needed
// ];

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch task details based on taskId (replace with actual API call)
    setTask(sampleTaskData);

    // Fetch comments for the task (replace with actual API call)
    // setComments([...]); // Update comments state with fetched comments
  }, [taskId]);

  // useEffect(() => {
  //   fetchTasks();
  // }, [taskId]);
  
  // const fetchTasks = async () => {
  //   try {
  //     const response = await fetch('data.json', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     })
  //     const data = await response.json();
  //     setTask(data);
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //   }
  // };

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = () => {
    // Logic to post comment (replace with actual API call)
    console.log('Posting comment:', comment);

    // Clear comment input field after posting
    setComment('');

    // Update comments state to include new comment
    setComments([...comments, { text: comment, author: 'Current User', date: new Date() }]);
  };

  const handleArrowClick = () => {
    router.back();
  }
  return (
    <Box>
      {/* <Link component={RouterLink} href="/tasks"> back </Link> */}
      {/* <ArrowBackIcon component={RouterLink} href="/tasks" /> */}
      <Button onClick={handleArrowClick}>Back</Button>
      {task && (
        <Box>
          <Typography variant="h4">{task.title}</Typography>
          <Typography variant="body1">{task.description}</Typography>
          <Typography variant="body2">Status: {task.status}</Typography>
          <Typography variant="body2">Priority: {task.priority}</Typography>
          <Typography variant="body2">Assigned To: {task.assigned_to}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Comments</Typography>
          <List>
            {comments.map((updates, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={updates.text}
                  secondary={`${updates.author} - ${updates.date.toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>

          <TextField
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={handleChangeComment}
            label="Add Comment"
            variant="outlined"
            margin="normal"
          />
          <Button onClick={handlePostComment} variant="contained" color="primary">
            Post Comment
          </Button>
        </Box>
      )}
    </Box>
  );
}

