import React, { useState, useEffect } from 'react';

import { DatePicker } from '@mui/lab';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid, Card, Badge, Checkbox, Accordion, TextField, Typography, AccordionDetails, AccordionSummary, FormControlLabel } from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------


export default function UserUpdates() {

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  useEffect(() => {
    // Fetch users data from API with selected date
    const fetchUsers = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [selectedDate]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (event, userId) => {
    if (event.target.checked) {
      setCheckedUsers([...checkedUsers, userId]);
    } else {
      setCheckedUsers(checkedUsers.filter(id => id !== userId));
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card
      >
        <Toolbar
          sx={{
            height: 96,
            display: 'flex',
            justifyContent: 'space-between',
            p: (theme) => theme.spacing(0, 1, 0, 3),
          }}
        >
          <OutlinedInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
            sx={{ mb: 2 }}
          />
          <Badge badgeContent={checkedUsers.length} color="primary">Review Completed</Badge>
        </Toolbar>
      </Card>
      <Box
      sx={{
        mt:3,
      }}
      >
          {filteredUsers.map((user, index) => (
            <Card
            key={index}
              sx={{
                m:1,
                borderRadius: 2,
              }}
            >
              <Accordion
                key={index}
                expanded={expandedAccordion === `panel${index}`}
                onChange={handleAccordionChange(`panel${index}`)}
              // slots={{ transition: Fade }}
              // slotProps={{ transition: { timeout: 400 } }}
              // disabled={checkedUsers.includes(user.id)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedUsers.includes(user.id)}
                        onChange={(event) => handleCheckboxChange(event, user.id)}
                      />
                    }
                    label=""
                  />
                  <Typography>{user.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Role: {user.role}</Typography>
                    </Grid>
                    {/* Add other user details as required */}
                    {/* Example: */}
                    <Grid item xs={12}>
                      <Typography>Email: {user.email}</Typography>
                    </Grid>
                    {/* Add other updates related to the user */}
                    {/* Example: */}
                    <Grid item xs={12}>
                      <Typography variant="h6">Updates:</Typography>
                      {user.updates.map((update, i) => (
                        <Typography key={i}>{update}</Typography>
                      ))}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Card>
          ))}
      </Box>
    </>
  );
}

