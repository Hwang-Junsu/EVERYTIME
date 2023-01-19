import Button from "@components/common/button";
import EditModal from "@components/modals/editModal";
import Layout from "@components/common/layout";
import PostList from "@components/profile/postList";
import {api} from "@libs/api";
import {cls} from "@libs/utils";
import Image from "next/legacy/image";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    dehydrate,
} from "react-query";
import BasicProfile from "images/basic_profile.jpg";
import {useSession} from "next-auth/react";

// ServerSide Render Need

export async function getServerSideProps({params}) {
    const queryFn = async () => {
        const res = await fetch(`http://localhost:3000/api/users/${params.id}`);
        const data = await res.json();
        return data;
    };
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["profile"], queryFn);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

function UserProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMyPosts, setIsMyPosts] = useState(true);
    const queryClient = useQueryClient();
    const router = useRouter();
    const {data: token} = useSession();
    const {data, refetch} = useQuery(
        ["profile"],
        () => api.get(`/api/users/${router?.query?.id}`),
        {refetchOnWindowFocus: false, enabled: Boolean(router.query.id)}
    );
    const {mutate} = useMutation(
        () => api.post(`/api/users/${router?.query?.id}/follow`),
        {onSuccess: () => queryClient.invalidateQueries(["profile"])}
    );
    const onFollow = () => {
        mutate();
    };

    useEffect(() => {
        refetch();
    }, [router.query.id, refetch]);

    return (
        <>
            <Layout seoTitle="Profile" hasTabBar>
                <header className="p-8 space-y-2 border-b-[1px]">
                    <section className="flex">
                        <div className="relative flex-shrink-0 w-16 h-16 mr-8 overflow-hidden rounded-full object-fit bg-slate-500">
                            {data && (
                                <Image
                                    src={
                                        data?.data?.user?.image || BasicProfile
                                    }
                                    layout="fill"
                                    alt="profileImage"
                                />
                            )}
                        </div>
                        <div className="w-full space-y-1">
                            <div>
                                <p>{data?.data?.user?.name || "NoName"}</p>
                            </div>
                            <div className="text-sm text-gray-600 whitespace-nowrap">
                                {data?.data?.user?.introduce || ""}
                            </div>
                            {data?.data?.user?.id === token?.user?.id ? (
                                <div
                                    className="w-2/3"
                                    onClick={() => setIsOpen((props) => !props)}
                                >
                                    <Button text="프로필 편집" />
                                </div>
                            ) : (
                                <div
                                    className="w-2/3"
                                    onClick={() => onFollow()}
                                >
                                    <Button
                                        text={
                                            data?.data?.isFollow
                                                ? "Unfollow"
                                                : "Follow"
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </header>
                <section className="px-3 py-2 border-b-[1px] flex items-center justify-center mb-1">
                    <table className="w-full">
                        <thead className="">
                            <tr className="text-sm text-center text-gray-500">
                                <th>게시글</th>
                                <th>북마크</th>
                                <th>팔로우</th>
                                <th>팔로잉</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center">
                                <td>{data?.data?.user?._count?.post}</td>
                                <td>{data?.data?.user?._count?.bookmark}</td>
                                <td>
                                    {data?.data?.user?._count?.receiveFollow}
                                </td>
                                <td>{data?.data?.user?._count?.sendFollow}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="flex w-full h-12 mb-2 space-x-2">
                    <div
                        className={cls(
                            "border-b-2 flex-grow flex items-center justify-center",
                            isMyPosts ? "border-blue-400" : ""
                        )}
                        onClick={() => setIsMyPosts(true)}
                        role="presentation"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={cls("", isMyPosts ? "blue" : "none")}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                            />
                        </svg>
                    </div>
                    {data?.data?.user?.id === token?.user?.id ? (
                        <div
                            className={cls(
                                "border-b-2 flex-grow flex items-center justify-center",
                                !isMyPosts ? "border-blue-400" : ""
                            )}
                            onClick={() => setIsMyPosts(false)}
                            role="presentation"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill={cls("", !isMyPosts ? "blue" : "none")}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                            </svg>
                        </div>
                    ) : null}
                </section>
                <PostList isMyPosts={isMyPosts} userId={router?.query?.id} />
            </Layout>
            {isOpen ? (
                <EditModal isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : null}
        </>
    );
}

export default UserProfile;
