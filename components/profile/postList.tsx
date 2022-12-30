import { api } from "@libs/api";
import { useQuery } from "react-query";
import PostCard from "./postCard";

export default function PostList({ userId, isMyPosts }) {
  const { data: userData } = useQuery(
    ["postlist"],
    () => api.get(`/api/posts/user/${userId}`),
    { refetchOnWindowFocus: false, enabled: isMyPosts }
  );
  const { data: bookmarkData } = useQuery(
    ["postlist"],
    () => api.get(`/api/posts/bookmark`),
    { refetchOnWindowFocus: false, enabled: !isMyPosts }
  );
  return (
    <section className="grid grid-rows-3 grid-cols-3 gap-1">
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
