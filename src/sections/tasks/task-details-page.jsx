import {  useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Box, List, Button, Divider, ListItem, TextField, Typography, ListItemText, Link, Paper } from '@mui/material';
// import { ArrowBackIcon } from '@mui/icons-material';

import Iconify from 'src/components/iconify';

import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';


export default function TaskDetailPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const router = useRouter();

  // useEffect(() => {
  //   // Fetch task details based on taskId (replace with actual API call)
  //   setTask(sampleTaskData);

  //   // Fetch comments for the task (replace with actual API call)
  //   // setComments([...]); // Update comments state with fetched comments
  // }, [taskId]);

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

  const handleArrowClick = () => {
    router.back();
  }
  return (
    <Box>
      {/* <Link component={RouterLink} href="/tasks"> back </Link> */}
      {/* <ArrowBackIcon component={RouterLink} href="/tasks" /> */}
      {/* <Button onClick={handleArrowClick}>Back</Button> */}
      <Tooltip title="Back">
          <IconButton component={RouterLink} href="/tasks">
          <Iconify sx={{height:32 , width:32 }} icon="ion:arrow-back" />
          </IconButton>
        </Tooltip>
      {task && (
        <Box>
          <Paper elevation={3} sx={{ p:2, }}>
          <Typography variant="h4">{task.title}</Typography>
          <Typography variant="body1">{task.description}</Typography>
          <Typography variant="body2">Status: {task.status}</Typography>
          <Typography variant="body2">Priority: {task.priority}</Typography>
          <Typography variant="body2">Assigned To: {task.assigned_to}</Typography>
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

