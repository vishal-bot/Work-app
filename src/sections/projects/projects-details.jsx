import React, { useState } from 'react';

// import { Link } from 'react-router-dom';

import { Tab, Tabs, Typography } from '@mui/material';

import KanbanBoard from './kanban-board';
// import ProjectDetails from './project-details;

const ProjectDetailsPage = () => {
    const [view, setView] = useState('details');

    const handleTabChange = (event, newValue) => {
      setView(newValue);
    };
 return (
    <>
    {/* <Typography variant="h4" gutterBottom>
      Project Details
    </Typography> */}
    <Tabs value={view} onChange={handleTabChange}>
      <Tab label="Details" value="details" />
      <Tab label="Kanban Board" value="kanban" />
    </Tabs>
    {view === 'details' && <ProjectDetails />}
    {view === 'kanban' && <KanbanBoard />}
  </>

  );
 };

export default ProjectDetailsPage;

const ProjectDetails = () => (
      <div>
        {/* Project details component */}
        <Typography variant="body1">Project details go here.</Typography>
      </div>
    );