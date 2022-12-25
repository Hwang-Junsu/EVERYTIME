import Feed from "@components/feed";
import Layout from "@components/layout";
import { api } from "@libs/api";
import axios from "axios";
import { useQuery } from "react-query";
import { Post } from "types/types";

export default function Home() {
  const { data, isLoading } = useQuery("posts", () =>
    axios.get("http://localhost:80/posts")
  );
  return (
    <Layout seoTitle="Main" hasTabBar>
      <main className="w-full space-y-3 p-7">
        {data?.data.map((post: Post) => (
          <Feed key={post.id} {...post} />
        ))}
      </main>
    </Layout>
  );
}
