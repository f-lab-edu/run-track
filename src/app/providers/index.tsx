import type { AppProps } from 'next/app';
import { Geist } from 'next/font/google';
import { OverlayProvider } from 'overlay-kit';
import { QueryProvider } from './query-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <OverlayProvider>
        <main className={`${geistSans.variable} mx-auto min-h-screen max-w-[480px] shadow-md`}>
          <Component {...pageProps} />
        </main>
      </OverlayProvider>
    </QueryProvider>
  );
}
