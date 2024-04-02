import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, TextField, Grid, Checkbox, FormControlLabel, Badge } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/lab';

const ReviewPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  useEffect(() => {
    // Fetch users data from API with selected date
    const fetchUsers = async () => {
      try {
        const response = await fetch(`your_api_endpoint?date=${selectedDate.toISOString()}`);
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
    <div>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Badge badgeContent={checkedUsers.length} color="primary">
        Checked Users
      </Badge>
      {filteredUsers.map((user, index) => (
        <Accordion
          key={index}
          expanded={expandedAccordion === `panel${index}`}
          onChange={handleAccordionChange(`panel${index}`)}
          disabled={checkedUsers.includes(user.id)}
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
              {/* <Grid item xs={12}>
                <Typography>Email: {user.email}</Typography>
              </Grid> */}
              {/* Add other updates related to the user */}
              {/* Example: */}
              {/* <Grid item xs={12}>
                <Typography variant="h6">Updates:</Typography>
                {user.updates.map((update, index) => (
                  <Typography key={index}>{update}</Typography>
                ))}
              </Grid> */}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default ReviewPage;
