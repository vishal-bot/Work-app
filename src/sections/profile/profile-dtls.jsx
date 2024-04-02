import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function ProfileDetails() {

    const memberId = sessionStorage.getItem('id');
    const [user, setUser] = useState();
    const { VITE_BACKEND_API_URL } = import.meta.env;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${VITE_BACKEND_API_URL}team/user/${memberId}`);
                const data = await response.json();
                console.log(data);
                setUser(data);
            } catch (error) {
                console.error('Error fetching Details:', error);
            }
        };

        fetchProjects();
    }, [VITE_BACKEND_API_URL, memberId]);


    return (
        <Box>
            {user && (
                <Stack>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Name: {user.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Email: {user.email}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Phone: {user.number}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Address: {user.role}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        City: {user.status}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Company: {user.company}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Team: {user.team_id}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
}
