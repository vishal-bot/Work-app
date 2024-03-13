import React from 'react';
import PropTypes from "prop-types";

import { Card, Typography, CardContent } from '@mui/material';


const ProjectCard = ({ project, onClick }) => (
    <Card>
      <CardContent>
        <Typography variant="h5" onClick={onClick} sx={{cursor: 'pointer'}}>
          {project.project_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.project_desc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Team: {project.team_id}
        </Typography>
        {/* Add onClick event to navigate to project details page */}
      </CardContent>
    </Card>
  );

export default ProjectCard;
ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  }