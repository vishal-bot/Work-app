import React, { useState, useEffect } from 'react';
import ProjectCard from '../projects-card';
import ProjectDetailsPage from '../projects-details';

const ProjectView = () => {
  const [projects, setProjects] = useState([
    {
      id: 'project-1',
      title: 'Project 1',
      stages: [
        { id: 'to-do', title: 'To Do', tasks: [{ id: 'task-1', title: 'Task 1' }, { id: 'task-2', title: 'Task 2' }] },
        { id: 'in-progress', title: 'In Progress', tasks: [{ id: 'task-3', title: 'Task 3' }] },
        { id: 'done', title: 'Done', tasks: [{ id: 'task-4', title: 'Task 4' }, { id: 'task-5', title: 'Task 5' }] },
      ],
    },
    {
      id: 'project-2',
      title: 'Project 2',
      stages: [
        { id: 'to-do', title: 'To Do', tasks: [{ id: 'task-6', title: 'Task 6' }, { id: 'task-7', title: 'Task 7' }] },
        { id: 'in-progress', title: 'In Progress', tasks: [{ id: 'task-8', title: 'Task 8' }] },
        { id: 'done', title: 'Done', tasks: [{ id: 'task-9', title: 'Task 9' }, { id: 'task-10', title: 'Task 10' }] },
      ],
    },
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('backend-api-url/projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
          <ProjectDetailsPage/>
    </div>
  );
};

export default ProjectView;

