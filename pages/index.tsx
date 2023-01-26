import Feed from "@components/feed/feed";
import Layout from "@components/common/layout";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { Post, User } from "@prisma/client";
import { useFetchPosts } from "hooks/useFetchPosts";
import Observer from "@components/common/observer";
import { dehydrate, QueryClient } from "react-query";
import RecentChats from "@components/chat/recentChats";

interface ICount {
  comments: number;
  likes: number;
}

interface PostWithLikeAndComment extends Post {
  _count: ICount;
  user: User;
  isLike: boolean;
  isBookmark: boolean;
}

export async function getServerSideProps() {
  const queryFn = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?id=`);
    const data = await res.json();
    return data;
  };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts"], queryFn);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
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
