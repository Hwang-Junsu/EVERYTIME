import Feed from "@components/feed";
import Layout from "@components/layout";
import { api } from "@libs/api";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { Post, User } from "@prisma/client";

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

export default function Home() {
  const { data, isLoading } = useQuery(["posts"], () => api.get("/api/posts"), {
    refetchOnWindowFocus: false,
  });
  const { status } = useSession();
  const router = useRouter();
  const checkLogin = useCallback(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <Layout seoTitle="Main" hasTabBar>
      <main className="w-full space-y-3 p-7">
        {data?.data.allPosts?.map((post: PostWithLikeAndComment) => {
          return <Feed key={post.id} {...post} />;
        })}
      </main>
    </Layout>
  );
}
