import {api} from "@libs/api";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useQuery} from "react-query";
import PostCard from "./postCard";

export default function PostList({userId, isMyPosts}) {
    const router = useRouter();
    const {data: userData, refetch} = useQuery(
        ["postlist"],
        () => api.get(`/api/posts/user/${userId}`),
        {refetchOnWindowFocus: false, enabled: isMyPosts}
    );
    const {data: bookmarkData} = useQuery(
        ["postlist"],
        () => api.get(`/api/posts/bookmark`),
        {refetchOnWindowFocus: false, enabled: !isMyPosts}
    );
    useEffect(() => {
        refetch();
    }, [router.query.id, refetch]);
    return (
        <section className="grid grid-cols-3 grid-rows-3 gap-1">
            {isMyPosts ? (
                <>
                    {userData?.data?.allPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            postId={post.id}
                            media={post.media}
                            thumbnail={post.thumbnail}
                            mediaType={post.mediaType}
                        />
                    ))}
                </>
            ) : (
                <>
                    {bookmarkData?.data?.allPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            postId={post.id}
                            media={post.media}
                            thumbnail={post.thumbnail}
                            mediaType={post.mediaType}
                        />
                    ))}
                </>
            )}
        </section>
    );
}
