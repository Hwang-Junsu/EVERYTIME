import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/join");
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
