'use client';

import { useEffect } from 'react';

export default function FontAwesomeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Import FontAwesome only on client side
    import('@/lib/fontawesome');
  }, []);

  return <>{children}</>;
} 