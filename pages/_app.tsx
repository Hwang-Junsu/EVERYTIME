import "../styles/globals.css";
import type {AppProps} from "next/app";
import {Hydrate, QueryClient, QueryClientProvider} from "react-query";
import {SessionProvider} from "next-auth/react";
import {ReactQueryDevtools} from "react-query/devtools";

function MyApp({Component, pageProps}: AppProps) {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <SessionProvider session={pageProps.session}>
                    <div className="">
                        <Component {...pageProps} />
                    </div>
                    <ReactQueryDevtools />
                </SessionProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
