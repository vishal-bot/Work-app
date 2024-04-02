import React, { useState, useEffect } from 'react';

import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid, Card, Stack, Badge, Checkbox, Accordion, Typography, AccordionDetails, AccordionSummary, FormControlLabel } from '@mui/material';

import Iconify from 'src/components/iconify';

import './user-updates.css';
// ----------------------------------------------------------------------


export default function UserUpdates() {

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedUsers, setCheckedUsers] = useState([]);
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  useEffect(() => {
    // Fetch users data from API
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
  }, []);

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

  const isUserSelected = (userId) => checkedUsers.includes(userId);

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
      }}
    >
      <Stack>
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
          <Stack
            direction="row"
            // alignItems="center"
            // flexWrap="wrap-reverse"
            justifyContent="flex-end"
            spacing={2}
          >
            <Badge badgeContent={checkedUsers.length} color="primary">
              Checked Users
            </Badge>
          </Stack>
        </Toolbar>
      </Stack>
      <Stack sx={{ mt: 5 }}>
        {filteredUsers.map((user, index) => (
          <Accordion
            key={index}
            expanded={expandedAccordion === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`)}
          // disabled={checkedUsers.includes(user.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              className={isUserSelected(user.id) ? 'selected-accordion' : ''}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isUserSelected(user.id)}
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
                    <Typography key={index}>{update}</Typography>
                  ))}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Card>
  );
}

