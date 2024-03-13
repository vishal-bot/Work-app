import { useState } from 'react';

// ----------------------------------------------------------------------

export function useUserDetail(detail) {
    const [user, setUser] = useState();
    setUser(detail);
    console.log('user');
  return null;
}