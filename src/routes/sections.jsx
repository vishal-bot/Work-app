import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import ReviewPage from 'src/pages/review';
import ProfilePage from 'src/pages/profile';
import DashboardLayout from 'src/layouts/dashboard';

import ProjectListPage from 'src/sections/projects/projects-list';
import ProjectDetailsPage from 'src/sections/projects/projects-details';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const TeamPage = lazy(() => import('src/pages/team'));
export const TasksPage = lazy(() => import('src/pages/tasks'));
export const TaskMainPage = lazy(() => import('src/sections/tasks/tasks-page'));
export const AddTaskPage = lazy(() => import('src/sections/tasks/add-task'));
export const EditTaskPage = lazy(() => import('src/sections/tasks/edit-task-page'));
export const TaskDetailPage = lazy(() => import('src/sections/tasks/task-details-page'));
export const ProjectsPage = lazy(() => import('src/pages/projects'));
export const AboutPage = lazy(() => import('src/pages/about'));

// ----------------------------------------------------------------------

export default function Router({ authService }) {
  
  const isAuthenticated = authService.isAuthenticated();
  const routes = useRoutes([
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/',
      element: isAuthenticated ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'review', element: <ReviewPage/> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'team', element: <TeamPage /> },
        { 
          path: 'tasks',
          element: <TasksPage />,
          children: [
            { path: '', element: <TaskMainPage /> },
            { path: 'addTask', element: <AddTaskPage /> },
            { path: ':taskId', element: <TaskDetailPage /> },
            { path: 'edit/:taskId', element: <EditTaskPage /> },
          ]
        },
        { path: 'projects',
         element: <ProjectsPage />, 
         children: [
          { path: '', element: <ProjectListPage /> },
          { path:':projectId', element: <ProjectDetailsPage/>},
         ]
        },
        { path: 'about', element: <AboutPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    }
    
  ]);

  return routes;
}
