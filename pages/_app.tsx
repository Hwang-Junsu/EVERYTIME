import "../styles/globals.css";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import {SessionProvider} from "next-auth/react";
import {ReactQueryDevtools} from "react-query/devtools";

function MyApp({Component, pageProps}: AppProps) {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={pageProps.session}>
                <div className="w-full max-w-xl mx-auto">
                    <Component {...pageProps} />
                </div>
                <ReactQueryDevtools />
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
