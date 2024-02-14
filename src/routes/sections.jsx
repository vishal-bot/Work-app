import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import useAuth from './hooks/useAuth';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const TeamPage = lazy(() => import('src/pages/team'));
export const TasksPage = lazy(() => import('src/pages/tasks'));
export const ProjectsPage = lazy(() => import('src/pages/projects'));
export const AboutPage = lazy(() => import('src/pages/about'));

// ----------------------------------------------------------------------

export default function Router() {
  const { isAuthenticated } = useAuth();


  const routes = useRoutes([
    {
      path: 'login',
      element: <LoginPage />,
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
        { path: 'team', element: <TeamPage /> },
        { path: 'tasks', element: <TasksPage /> },
        { path: 'projects', element: <ProjectsPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    }
    
  ]);

  return routes;
}
