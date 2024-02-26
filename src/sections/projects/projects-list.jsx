
import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { List, GridOn } from '@mui/icons-material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Card, Divider, Container, IconButton } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';

import ProjectCard from './projects-card';

const ProjectListPage = () => {

    const [view, setView] = useState('grid');

    const [projects, setProjects] = useState([
        {
            id: '1',
            title: 'Project 1',
            stages: [
                { id: 'to-do', title: 'To Do', tasks: [{ id: 'task-1', title: 'Task 1' }, { id: 'task-2', title: 'Task 2' }] },
                { id: 'in-progress', title: 'In Progress', tasks: [{ id: 'task-3', title: 'Task 3' }] },
                { id: 'done', title: 'Done', tasks: [{ id: 'task-4', title: 'Task 4' }, { id: 'task-5', title: 'Task 5' }] },
            ],
        },
        {
            id: '2',
            title: 'Project 2',
            stages: [
                { id: 'to-do', title: 'To Do', tasks: [{ id: 'task-6', title: 'Task 6' }, { id: 'task-7', title: 'Task 7' }] },
                { id: 'in-progress', title: 'In Progress', tasks: [{ id: 'task-8', title: 'Task 8' }] },
                { id: 'done', title: 'Done', tasks: [{ id: 'task-9', title: 'Task 9' }, { id: 'task-10', title: 'Task 10' }] },
            ],
        },
    ]);

    // useEffect(() => {
    //   const fetchProjects = async () => {
    //     try {
    //       const response = await fetch('backend-api-url/projects');
    //       const data = await response.json();
    //       setProjects(data);
    //     } catch (error) {
    //       console.error('Error fetching projects:', error);
    //     }
    //   };

    //   fetchProjects();
    // }, []);

    const router = useRouter();
    const handleProjectClick = (id) => {
        router.push(`/projects/${id}`);
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
                            <Grid item key={project.id} xs={12} sm={6} md={6}>
                                <ProjectCard
                                    project={project} onClick={() => handleProjectClick(project.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={2}>
                        {projects.map(project => (
                            <Grid item key={project.id} xs={12} sm={12} md={12}>
                                <ProjectCard
                                    project={project} onClick={() => handleProjectClick(project.id)}
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
