import React from 'react';
import PropTypes from "prop-types";

import { Card, CardContent, Typography } from '@mui/material';
import { RouterLink } from 'src/routes/components';


const ProjectCard = ({ project }) =>
   (
    <Card>
      <CardContent>
        <Typography variant="h5" component={RouterLink} to='/projects'>
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
  }