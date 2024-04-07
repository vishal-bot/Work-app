import React, { useState, useEffect } from 'react';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Grid, Paper, Checkbox, TextField, IconButton, Typography, FormControlLabel } from '@mui/material';

// import "./user-updates.css";
import UserContent from './user-content';


const images = [
  {
    url: `/assets/images/carousel/image-1.jpg`,
    caption: 'First Slide',
  },
  {
    url: `/assets/images/carousel/image-2.jpg`,
    caption: 'Second Slide',
  },
  {
    url: `/assets/images/carousel/image-3.jpg`,
    caption: 'Third Slide',
  },
  {
    url: `/assets/images/carousel/image-4.jpg`,
    caption: 'Fourth Slide',
  },
  {
    url: `/assets/images/carousel/image-5.jpg`,
    caption: 'Fifth Slide',
  },
  {
    url: `/assets/images/carousel/image-6.jpg`,
    caption: 'Sixth Slide',
  },
  {
    url: `/assets/images/carousel/image-7.jpg`,
    caption: 'Seventh Slide',
  },
];

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [visitedUsers, setVisitedUsers] = useState([]);
  const { VITE_BACKEND_API_URL } = import.meta.env;

  useEffect(() => {
    // Fetch users data
    const fetchUsers = async () => {
      try {
        // Make API call to fetch users
        const response = await fetch(`${VITE_BACKEND_API_URL}team/${sessionStorage.getItem('teamId')}`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [VITE_BACKEND_API_URL]);



  const handleUserClick = (user) => {
    setSelectedUser(user);
    setVisitedUsers([...visitedUsers, user.member_id]);
    // Check if the user has already been visited
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setActiveIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [paused]);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleMouseDown = () => {
    setPaused(true);
  };

  const handleMouseUp = () => {
    setPaused(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={10}
      >
        {selectedUser === null ? (
          <Box
            sx={{
              '--Grid-borderWidth': '1px',
              border: 'var(--Grid-borderWidth) dashed',
              borderColor: 'divider',
              p: 4,
            }}
          >
            <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>Welcome to User&apos;s Review Area &#128591;</Typography>
            <Box
              sx={{
                position: 'relative', margin: 'auto',
                cursor: paused ? 'grab' : 'pointer',
                transition: 'cursor 0.3s ease',
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              <img
                src={images[activeIndex].url}
                alt={`carousel-item-${activeIndex}`}
                style={{ width: '100%', height: 'auto' }}
              />
              <Typography
                variant="h5"
                component="div"
                color="text.primary"
                sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '5px 10px', borderRadius: 5 }}
              >
                {images[activeIndex].caption}
              </Typography>
              <IconButton
                onClick={handlePrevClick}
                sx={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              >
                <ArrowBack />
              </IconButton>
              <IconButton
                onClick={handleNextClick}
                sx={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              >
                <ArrowForward />
              </IconButton>
            </Box>
            <Typography variant='h4' sx={{ textAlign: 'right' }}>Click on User list &#128073; to start</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              '--Grid-borderWidth': '2px',
              border: 'var(--Grid-borderWidth) dashed',
              borderColor: 'divider',
              height: '100%',
              p: 2,
            }}
          >
            <UserContent user={selectedUser} />
          </Box>
        )}

      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search user..."
          label="Search User"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        {filteredUsers.map((user) => (
          <Paper
            key={user.member_id}
            sx={{ my: 1 }}
          >
            <FormControlLabel
              sx={{ px: 2 }}
              control={
                <Checkbox
                  checked={selectedUser !== null ? selectedUser.member_id === user.member_id : false}
                  onChange={() => handleUserClick(user)}

                />
              }
              label={user.name}
              className={visitedUsers.includes(user.member_id) ? 'visited' : ''}
            // className={selectedUser === user.member_id ? 'active' : ''}
            />
          </Paper>
        ))}
      </Grid>

    </Grid>
  );
};

export default Dashboard;
