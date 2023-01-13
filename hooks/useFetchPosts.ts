import { api } from "./../libs/api";
import { useInfiniteQuery } from "react-query";
import axios from "axios";

export function useFetchPosts() {
  const queryResult = useInfiniteQuery(
    ["posts"],
    ({ pageParam = "" }) => get(`?id=${pageParam}`),
    {
      getNextPageParam: ({ allPosts }) => {
        return allPosts ? allPosts[allPosts.length - 1].id : undefined;
      },
    }
  );

  return queryResult;
}
const service = axios.create({
  baseURL: "/api/posts",
});
function get(queryString: string) {
  return service.get(queryString).then((response) => response.data);
}
