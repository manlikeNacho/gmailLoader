// components/ClientSessionProvider.js
"use client";

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';

export default function ClientSessionProvider({ children }) {

  return (
    <NextUIProvider>
    <SessionProvider>
      {children}
    </SessionProvider>
    </NextUIProvider>
  );
}
