import {  useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Box, List, Paper, Button, Divider, ListItem, TextField, Typography, ListItemText } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);


  useEffect(() => {
    // Fetch task data based on taskId
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`);
        const data = await response.json();
        setTask(data[0]);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  },[taskId]);

  // useEffect(() => {
  //   // Fetch task data based on taskId
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch(`https://work-app-backend.onrender.com/api/tasks/${taskId}`);
  //       const data = await response.json();
  //       setComments(data[0]);
  //     } catch (error) {
  //       console.error('Error fetching task:', error);
  //     }
  //   };
  //   fetchComments();
  // },[taskId]);

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

  return (
    <Box>
      <Tooltip title="Back">
          <IconButton component={RouterLink} href="/tasks">
          <Iconify sx={{height:32 , width:32 }} icon="ion:arrow-back" />
          </IconButton>
        </Tooltip>
      {task && (
        <Box>
          <Paper elevation={3} sx={{ p:2, }}>
          <Typography variant="h4">{task.task_title}</Typography>
          <Typography variant="body1">{task.task_desc}</Typography>
          <Typography variant="body2">Creation time: {task.created_at}</Typography>
          <Typography variant="body2">Stage: {task.stage}</Typography>
          <Typography variant="body2">Status: {task.status}</Typography>
          <Typography variant="body2">Priority: {task.priority}</Typography>
          <Typography variant="body2">Assigned To: {task.assigned_to}</Typography>
          <Typography variant="body2">Project ID: {task.project_id}</Typography>
          </Paper>
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

