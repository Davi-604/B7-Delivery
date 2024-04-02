import { AppProvider } from '@/context/app/AppContext';
import { AuthContext, AuthProvider } from '@/context/auth/AuthContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </AuthProvider>
    );
}
