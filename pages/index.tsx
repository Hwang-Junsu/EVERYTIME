import Feed from "@components/feed";
import Layout from "@components/layout";
import {api} from "@libs/api";
import {useQuery} from "react-query";
import {Post} from "types/types";
import {useSession} from "next-auth/react";
import {useCallback, useEffect} from "react";
import {useRouter} from "next/dist/client/router";

export default function Home() {
    const {data, isLoading} = useQuery("posts", () => api.get("/posts"));
    const {status} = useSession();
    const router = useRouter();
    const checkLogin = useCallback(() => {
        if (status === "unauthenticated") router.push("/");
    }, [status, router]);

    useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    return (
        <Layout seoTitle="Main" hasTabBar>
            <main className="w-full space-y-3 p-7">
                {/* {data?.data.map((post: Post) => (
                    <Feed key={post.id} {...post} />
                ))} */}
            </main>
        </Layout>
    );
}
