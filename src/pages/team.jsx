import { Helmet } from 'react-helmet-async';

import { TeamView } from 'src/sections/team/view';

// ----------------------------------------------------------------------

export default function TeamPage() {
  return (
    <>
      <Helmet>
        <title> Team | Work App</title>
      </Helmet>

      <TeamView />
    </>
  );
}