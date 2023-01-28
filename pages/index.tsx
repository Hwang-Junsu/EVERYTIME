import Feed from "@components/feed/feed";
import Layout from "@components/common/layout";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useFetchPosts } from "hooks/useFetchPosts";
import Observer from "@components/common/observer";
import RecentChats from "@components/chat/recentChats";
import { PostWithLikeAndComment } from "types/types";

function Home() {
  const { data, hasNextPage, fetchNextPage } = useFetchPosts();
  const { status } = useSession();
  const router = useRouter();
  const checkLogin = useCallback(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  const handleIntersection = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderPostsList = () => {
    if (data && data.pages) {
      const postList = data.pages.reduce<PostWithLikeAndComment[]>(
        (prev, { allPosts }) => {
          if (allPosts) prev.push(...allPosts);
          return prev;
        },
        []
      );

      return postList.map((post) => <Feed key={post.id} post={post} />);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <Layout seoTitle="Main" hasTabBar>
      <RecentChats />
      <main className="w-full space-y-3 p-7">
        {renderPostsList()}
        {hasNextPage && <Observer handleIntersection={handleIntersection} />}
      </main>
    </Layout>
  );
}

export default Home;
