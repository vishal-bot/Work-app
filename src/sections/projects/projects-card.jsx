import React from 'react';
import PropTypes from "prop-types";

import { Card, Typography, CardContent } from '@mui/material';


const ProjectCard = ({ project, onClick }) => (
    <Card>
      <CardContent>
        <Typography variant="h5" onClick={onClick} sx={{cursor: 'pointer'}}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Team: {project.team}
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