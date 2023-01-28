import { api } from "@libs/api";
import { useQuery } from "react-query";

export default function useOtherUser(id: string) {
  const { data, refetch, isLoading } = useQuery(
    ["profile", id],
    () => api.get(`/api/users/${id}`),
    { refetchOnWindowFocus: false, enabled: Boolean(id) }
  );

  return { data: data?.data, isLoading, refetch };
}
