import '@/styles/globals.css';
import '@/styles/overrides.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import '../styles/icons.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '@/contexts/User';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_ID as string}>
      <QueryClientProvider client={queryClient}>
        <div className={inter.className}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </div>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
