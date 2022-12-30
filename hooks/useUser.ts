import {useSession} from "next-auth/react";
import {User} from "../types/types";
import {api} from "@libs/api";
import {useQuery} from "react-query";

interface ProfileResponse {
    ok: boolean;
    profile: User;
}

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
