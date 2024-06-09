// components/ClientSessionProvider.js
"use client";

import { SessionProvider, useSession } from 'next-auth/react';

export default function ClientSessionProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
