import { Helmet } from 'react-helmet-async';

import { AboutView } from 'src/sections/about/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> About | Work App</title>
      </Helmet>

      <AboutView />
    </>
  );
}