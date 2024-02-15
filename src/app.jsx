/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import useAuth from 'src/routes/hooks/useAuth';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <ThemeProvider>
      <Router/>
    </ThemeProvider>
  );
}
