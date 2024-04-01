import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Tooltip from '@mui/material/Tooltip';
import { Tab, Box, Tabs } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

import KanbanBoard from './kanban-board';
import ProjectInfo from './project-info';
// import ProjectDetails from './project-details;

const ProjectDetailsPage = () => {

  const { projectId } = useParams();
  // console.log(projectId);
  const [project, setProject] = useState();

  const { VITE_BACKEND_API_URL } = import.meta.env;

  useEffect(() => {
    // Fetch task data based on taskId
    const fetchProject = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_API_URL}project/${projectId}`);
        const data = await response.json();
        setProject(data[0]);
      } catch (error) {
        console.error('Error fetching Project:', error);
      }
    };
    fetchProject();
  }, [VITE_BACKEND_API_URL, projectId]);


  const [view, setView] = useState('details');

  const handleTabChange = (event, newValue) => {
    setView(newValue);
  };
  return (
    <Box>
      <Tooltip title="Back">
        <IconButton component={RouterLink} href="/projects">
          <Iconify sx={{ height: 32, width: 32 }} icon="ion:arrow-back" />
        </IconButton>
      </Tooltip>
      <Tabs value={view} onChange={handleTabChange} sx={{mb:2}}>
        <Tab label="Details" value="details" />
        <Tab label="Kanban Board" value="kanban" />
      </Tabs>
      {view === 'details' && <ProjectInfo project={project} />}
      {view === 'kanban' && <KanbanBoard project={project} projectId={projectId} />}
    </Box>
  );
};

export default ProjectDetailsPage;

