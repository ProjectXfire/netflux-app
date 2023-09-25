import './globals.css';
import type { Metadata } from 'next';
import { Capriola } from 'next/font/google';
import { Providers } from '@/shared/components';

const capriola = Capriola({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Netflux App',
  description: 'Netflux'
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='en'>
      <body className={capriola.className}>
        <Providers>
          <main className='blue-dark'>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
