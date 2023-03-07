import {useEffect} from "react";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import {api} from "@libs/api";
import PostCard from "./postCard";

export default function PostList({userId, isMyPosts}) {
  const router = useRouter();
  const {data: userData, refetch} = useQuery(
    ["posts"],
    () => api.get(`/api/posts/user/${userId}`),
    {refetchOnWindowFocus: false, enabled: isMyPosts}
  );
  const {data: bookmarkData} = useQuery(
    ["posts"],
    () => api.get(`/api/posts/bookmark`),
    {refetchOnWindowFocus: false, enabled: !isMyPosts}
  );
  useEffect(() => {
    refetch();
  }, [router.query.id, refetch]);
  return (
    <section className="grid grid-cols-3 grid-rows-3 gap-2 p-2 mx-auto flex-wrap place-items-center bg-indigo-200 shadow-inner min-h-[450px]">
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
