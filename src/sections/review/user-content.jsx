/* eslint-disable import/no-extraneous-dependencies */
import dayjs from 'dayjs';
import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Card, Grid, Link, Stack, Typography, CardHeader, CardContent } from '@mui/material';

import Scrollbar from 'src/components/scrollbar';

// import "./user-updates.css";

const UserContent = ({ user }) => {

    const [taskUpdates, setTaskUpdates] = useState([]);
    const [commentUpdates, setCommentsUpdates] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const { VITE_BACKEND_API_URL } = import.meta.env;
    const date = selectedDate.format('YYYY-MM-DD');
    // console.log(date);
    // console.log(typeof date);

    const [userStats, setUserStats] = useState({
        active: 5,
        inactive: 2,
        ToDo: 4,
        InProgress: 6,
        Done: 7,
        total: 15,
    });

    useEffect(() => {
        const taskStats = () => {
            const stats = {
                active: tasks.filter((object) => object.status === 'Active').length,
                inactive: tasks.filter((object) => object.status === 'InActive').length,
                ToDo: tasks.filter((object) => object.stage === 'ToDo').length,
                InProgress: tasks.filter((object) => object.stage === 'InProgress').length,
                Done: tasks.filter((object) => object.stage === 'Done').length,
                total: tasks.length,
            }
            setUserStats(stats);
        }
        taskStats();
    }, [tasks]);



    useEffect(() => {
        // Fetch users data
        fetchDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, user]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${VITE_BACKEND_API_URL}tasks/user/${sessionStorage.getItem('teamId')}/${user.member_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, [VITE_BACKEND_API_URL, user]);

    const fetchDashboardData = async () => {
        try {
            // Make API call to fetch dashboard data based on userId
            const response = await fetch(`${VITE_BACKEND_API_URL}review/task/${date}/${user.member_id}`);
            const data = await response.json();
            setTaskUpdates(data);
            const response1 = await fetch(`${VITE_BACKEND_API_URL}review/cmnt/${date}/${user.member_id}`);
            const data1 = await response1.json();
            setCommentsUpdates(data1);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };


    return (
        <>
            <Stack>
                <Typography variant="h3" textAlign='center' typography={user.name}>{user.name}&apos;s review page</Typography>
            </Stack>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={4}>
                    <Card
                        sx={{
                            borderRadius: 2,
                        }}>
                        <CardContent spacing={0.5} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" >{userStats.total}</Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Total Assigned Tasks
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card
                        sx={{
                            borderRadius: 2,
                        }}>
                        <CardContent spacing={0.5} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" >{userStats.ToDo}</Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Tasks in ToDo Stage
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card
                        sx={{
                            borderRadius: 2,
                        }}>
                        <CardContent spacing={0.5} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" >{userStats.InProgress}</Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                InProgress Tasks
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card
                        sx={{
                            borderRadius: 2,
                        }}>
                        <CardContent spacing={0.5} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" >{userStats.Done}</Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Completed Tasks
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card
                        sx={{
                            borderRadius: 2,
                        }}>
                        <CardContent spacing={0.5} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" >{userStats.active}</Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Active Tasks
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card
                        sx={{
                            borderRadius: 2,
                        }}>
                        <CardContent spacing={0.5} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" >{userStats.inactive}</Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                InActive Tasks
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card
                    sx={{
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                        p:2,
                        height:350,
                    }}>
                    {/* <Typography variant="h4">select date option vrth rttvrv</Typography> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Status Date"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                        // defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                        />
                    </LocalizationProvider>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    {/* <Card
                        sx={{
                            borderRadius: 2,
                        }}>
                        <CardContent spacing={0.5} sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" >{4}</Typography>
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Assigned Tasks
                            </Typography>
                        </CardContent>
                    </Card> */}
                    <Card>
                    <CardHeader title='Created and Updated Tasks' subheader='By given date' />
                    <List
                        sx={{
                            width: '100%',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },
                        }}
                        subheader={<li />}
                    >
                        {['Created tasks', 'Updated tasks'].map((sectionId) => (
                            <li key={`section-${sectionId}`}>
                                <ul>
                                    <ListSubheader>{`${sectionId}`}</ListSubheader>
                                    {taskUpdates.filter((object) => object.status === sectionId).map((item) => (
                                        <ListItem key={`item-${sectionId}-${item.task_title}`}>
                                            <ListItemText primary={`${item.task_title}`} />
                                            <ListItemText primary={`${item.task_desc}`} noWrap/>
                                            <ListItemText sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }} primary={`${new Date(item.update_date).toLocaleString()}`} />
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </List>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Card
                        sx={{
                            borderRadius: 2,
                        }}>
                            <CardHeader title='Comments on tasks on selected date' subheader='Subheader' />
                        <Scrollbar>
                            <Stack spacing={3} sx={{
                                p: 2, pr: 0,
                                overflow: 'auto',
                                maxHeight: 300,
                            }}>
                                {commentUpdates.map((cmnt) => (
                                    <Stack key={cmnt.update_id} direction="row" alignItems="center" spacing={2}>
                                        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                                            <Link color="inherit" variant="title" underline="hover" noWrap>
                                                {cmnt.task_title} :
                                            </Link>

                                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                {cmnt.comment_text}
                                            </Typography>
                                        </Box>

                                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                            {new Date(cmnt.update_date).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Scrollbar>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <Card
                    >
                        <CardHeader title='List of Total Tasks Assigned' subheader='Subheader' />

                        <Scrollbar>
                            <Stack spacing={3} sx={{
                                p: 2, pr: 0,
                                overflow: 'auto',
                                maxHeight: 300,
                            }}>
                                {tasks.map((task) => (
                                    <Stack key={task.task_id} direction="row" alignItems="center" spacing={2}>
                                        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                                            <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                                                {task.task_title}
                                            </Link>

                                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                {task.task_desc}
                                            </Typography>
                                        </Box>

                                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                            {new Date(task.created_at).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Scrollbar>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card
                        sx={{
                            borderRadius: 2,
                            height: 360,
                        }}>
                        <CardContent spacing={0.5} sx={{ textAlign: 'center' }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Placeholder
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardHeader title='Tasks in completed stage' subheader='Subheader' />
                        <Scrollbar>
                            <Stack spacing={3} sx={{
                                p: 2, pr: 0,
                                overflow: 'auto',
                                maxHeight: 300,
                            }}>
                                {tasks.filter((object) => object.stage === 'Done').map((task) => (
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                                            <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                                                {task.task_title}
                                            </Link>

                                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                {task.task_desc}
                                            </Typography>
                                        </Box>

                                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                            {new Date(task.created_at).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Scrollbar>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardHeader title='Work in Progress Tasks' subheader='Subheader' />
                        <Scrollbar>
                            <Stack spacing={3} sx={{
                                p: 2, pr: 0,
                                overflow: 'auto',
                                maxHeight: 300,
                            }}>
                                {tasks.filter((object) => object.stage === 'InProgress').map((task) => (
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                                            <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                                                {task.task_title}
                                            </Link>

                                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                {task.task_desc}
                                            </Typography>
                                        </Box>

                                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                            {new Date(task.created_at).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Scrollbar>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardHeader title='In Active Tasks' subheader='Subheader' />
                        <Scrollbar>
                            <Stack spacing={3} sx={{
                                p: 2, pr: 0,
                                overflow: 'auto',
                                maxHeight: 300,
                            }}>
                                {tasks.filter((object) => object.status === 'InActive').map((task) => (
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                                            <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                                                {task.task_title}
                                            </Link>

                                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                {task.task_desc}
                                            </Typography>
                                        </Box>

                                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                            {new Date(task.created_at).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Scrollbar>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card>
                        <CardHeader title='Active Tasks' subheader='Subheader' />
                        <Scrollbar>
                            <Stack spacing={3} sx={{
                                p: 2, pr: 0,
                                overflow: 'auto',
                                maxHeight: 300,
                            }}>
                                {tasks.filter((object) => object.status === 'Active').map((task) => (
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Box sx={{ minWidth: 240, flexGrow: 1 }}>
                                            <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
                                                {task.task_title}
                                            </Link>

                                            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                                                {task.task_desc}
                                            </Typography>
                                        </Box>

                                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                                            {new Date(task.created_at).toLocaleString()}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Scrollbar>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default UserContent;
UserContent.propTypes = {
    user: PropTypes.object.isRequired,
}