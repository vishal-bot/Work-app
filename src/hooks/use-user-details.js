import { useState } from 'react';

// ----------------------------------------------------------------------

export function useUserDetail(detail) {
    const [, setUser] = useState();
    setUser(detail);
    console.log('user');
  return null;
}