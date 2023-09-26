'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props): JSX.Element {
  return (
    <NextUIProvider>
      <Toaster />
      {children}
    </NextUIProvider>
  );
}
export default Providers;
