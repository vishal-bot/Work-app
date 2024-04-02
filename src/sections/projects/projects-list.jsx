
import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { List, GridOn } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Card, Divider, IconButton } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

import ProjectCard from './projects-card';

const ProjectListPage = () => {

    const {VITE_BACKEND_API_URL} = import.meta.env;

    const [view, setView] = useState('grid');

    const [projects, setProjects] = useState([]);

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await fetch(`${VITE_BACKEND_API_URL}project/team/${sessionStorage.getItem('teamId')}`);
          const data = await response.json();
          setProjects(data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };

      fetchProjects();
    }, [VITE_BACKEND_API_URL]);

    const router = useRouter();
    const handleProjectClick = (projectId) => {
        router.push(`/projects/${projectId}`);
    }

    const handleViewChange = (viewType) => {
        setView(viewType);
    };


    return (
        <>
            <Card >
                <Toolbar
                    sx={{
                        height: 96,
                        display: 'flex',
                        justifyContent: 'space-between',
                        p: (theme) => theme.spacing(0, 1, 0, 3),
                    }}
                >
                    <OutlinedInput
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
                        alignItems="center"
                        flexWrap="wrap-reverse"
                        justifyContent="flex-end"
                        spacing={2}
                    >
                        <Stack direction='row' sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <IconButton onClick={() => handleViewChange('grid')}>
                                <GridOn />
                            </IconButton>
                            <IconButton onClick={() => handleViewChange('list')}>
                                <List />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Toolbar>
            </Card>

            <Divider sx={{ borderStyle: 'dashed' }} />


            <Stack sx={{ mt: 2 }}>
                {/* Task cards */}
                {view === 'grid' ? (
                    <Grid container spacing={2}>
                        {projects.map(project => (
                            <Grid item key={project.project_id} xs={12} sm={6} md={6}>
                                <ProjectCard
                                    project={project} onClick={() => handleProjectClick(project.project_id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        {projects.map(project => (
                            <Grid item key={project.project_id} xs={12} sm={8} md={8}>
                                <ProjectCard
                                    project={project} onClick={() => handleProjectClick(project.project_id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Stack>
        </>
    );
};

export default ProjectListPage;
