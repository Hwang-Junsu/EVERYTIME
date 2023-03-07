import {useQuery} from "react-query";
import {useSession} from "next-auth/react";
import {api} from "@libs/api";

export default function useUser() {
  const {data: token} = useSession();
  const {data, isLoading} = useQuery(
    ["currentUser", token?.user?.id],
    () => api.get(`/api/users/${token?.user?.id}`),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {user: data?.data?.user, isLoading};
}
