import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Box, List, Paper, Button, Divider, ListItem, TextField, Typography, ListItemText } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState({
    task_id:taskId,
    member_id:sessionStorage.getItem('id'),
    member_name:sessionStorage.getItem('name'),
    comment_text:'',
  });
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { VITE_BACKEND_API_URL } = import.meta.env;

  const handleBack = () => {
    router.back();
  }

  useEffect(() => {
    // Fetch task data based on taskId
    const fetchTask = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_API_URL}tasks/${taskId}`);
        const data = await response.json();
        setTask(data[0]);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [taskId, VITE_BACKEND_API_URL]);

  useEffect(() => {
    // Fetch task data based on taskId
    const fetchComments = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_API_URL}tasks/cmnt/${taskId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchComments();
  }, [taskId, VITE_BACKEND_API_URL, comment]);

  const handleChangeComment = (event) => {
    setComment({
      task_id: taskId,
      member_id: sessionStorage.getItem('id'),
      member_name: sessionStorage.getItem('name'),
      comment_text:event.target.value,
    });
  };

  const handlePostComment = async (e) => {
    // Logic to post comment (replace with actual API call)
    e.preventDefault();
    try {
      const response = await fetch(`${VITE_BACKEND_API_URL}tasks/cmnt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      }); if (response.ok) {
        // Clear comment input field after posting
        setComment({
          task_id: taskId,
          member_id: sessionStorage.getItem('id'),
          member_name: sessionStorage.getItem('name'),
          comment_text:'',
        });
        // router.reload();
      } else {
        console.error('Failed to add Comment');
      }
    } catch (error) {
      console.error('Error adding Comment:', error);
    }

    // Update comments state to include new comment
    // setComments([...comments, comment]);
  };


  return (
    <Box>
      <Tooltip title="Back">
        <IconButton onClick={handleBack}>
          <Iconify sx={{ height: 32, width: 32 }} icon="ion:arrow-back" />
        </IconButton>
      </Tooltip>
      {task && (
        <Box>
          <Paper elevation={3} sx={{ p: 2, }}>
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
                  primary={updates.comment_text}
                  secondary={`${updates.member_name} - ${new Date(updates.timestamp).toLocaleString()}`}
                />
                {/* {console.log(new Date(updates.timestamp).toLocaleString("lookup"))} */}
                          {/* {console.log(format(updates.timestamp.toLocaleString(), 'yyyy/MM/dd kk:mm:ss'))} */}
              </ListItem>
            ))}
          </List>

          <TextField
            fullWidth
            multiline
            rows={4}
            name='comment_text'
            value={comment.comment_text}
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

