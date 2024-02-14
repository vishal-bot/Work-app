import { Helmet } from 'react-helmet-async';

import { ProjectsView } from 'src/sections/projects/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Projects | Work App</title>
      </Helmet>

      <ProjectsView />
    </>
  );
}