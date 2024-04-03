
import { Box, Paper, Typography } from '@mui/material';
// import { ArrowBackIcon } from '@mui/icons-material';

import PropTypes from "prop-types";


const ProjectInfo = ({project}) => (
    <div>
        {/* Project details component */}
        {project && (
            <Box sx={{m:2}}>
                <Paper elevation={3} sx={{ p: 2, }}>
                    <Typography variant="h4">Project Name: {project.project_name}</Typography>
                    <Typography variant="body1">Project Description: {project.project_desc}</Typography>
                    <Typography variant="body2">Creation time: {new Date(project.created_at).toLocaleString()}</Typography>
                    <Typography variant="body2">Status: {project.status}</Typography>
                    <Typography variant="body2">Team: {project.team_id}</Typography>
                </Paper>
            </Box>    
        )}
    </div>
    )
    
export default ProjectInfo;

ProjectInfo.propTypes = {
    project: PropTypes.object,
  }