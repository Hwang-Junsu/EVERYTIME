import "../styles/globals.css";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import {SessionProvider} from "next-auth/react";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={pageProps.session}>
                <div className="w-full max-w-xl mx-auto">
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
