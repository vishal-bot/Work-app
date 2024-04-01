import { Helmet } from 'react-helmet-async';

import { ReviewView } from 'src/sections/review/view';

// ----------------------------------------------------------------------

export default function ReviewPage() {
  return (
    <>
      <Helmet>
        <title> Review | Work App</title>
      </Helmet>

      <ReviewView />
    </>
  );
}