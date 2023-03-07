import {useInfiniteQuery} from "react-query";
import axios from "axios";

export function useFetchPosts() {
  const queryResult = useInfiniteQuery(
    ["posts"],
    ({pageParam = ""}) => get(`posts?id=${pageParam}`),
    {
      getNextPageParam: ({allPosts}) => {
        return allPosts ? allPosts[allPosts.length - 1].id : undefined;
      },
    }
  );

  return queryResult;
}
const service = axios.create({
  baseURL: "/api",
});
function get(queryString: string) {
  return service.get(queryString).then((response) => response.data);
}
