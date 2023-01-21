import Layout from "@components/common/layout";
import PostList from "@components/profile/postList";
import {api} from "@libs/api";
import {cls} from "@libs/utils";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {useSession} from "next-auth/react";
import ChatAddModal from "@components/chat/chatAddModal";
import PostIcon from "@components/svg/postIcon";
import {BookmarkIcon} from "@components/svg";
import ProfileCard from "@components/profile/profileCard";

export default function UserProfile() {
    const [followListOpen, setFollowListOpen] = useState<boolean>(false);
    const [isMyPosts, setIsMyPosts] = useState<boolean>(true);
    const router = useRouter();
    const {data: token} = useSession();

    const {data, refetch, isLoading} = useQuery(
        ["profile"],
        () => api.get(`/api/users/${router?.query?.id}`),
        {refetchOnWindowFocus: false, enabled: Boolean(router.query.id)}
    );

    useEffect(() => {
        refetch();
    }, [router.query.id, refetch]);

    return (
        <>
            <Layout seoTitle="Profile" hasTabBar>
                {isLoading ? null : (
                    <>
                        <header className="p-8 space-y-2 border-b-[1px]">
                            {data && (
                                <ProfileCard
                                    image={data.data.user.image}
                                    name={data.data.user.name}
                                    introduce={data.data.user.introduce}
                                    id={data.data.user.id}
                                    isFollow={data.data.isFollow}
                                />
                            )}
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
                                        <td>
                                            {data?.data?.user?._count?.post}
                                        </td>
                                        <td>
                                            {data?.data?.user?._count?.bookmark}
                                        </td>

                                        <td
                                            className="cursor-pointer "
                                            onClick={() =>
                                                setFollowListOpen(
                                                    (props) => !props
                                                )
                                            }
                                        >
                                            {
                                                data?.data?.user?._count
                                                    ?.receiveFollow
                                            }
                                        </td>
                                        <td
                                            className="cursor-pointer "
                                            onClick={() =>
                                                setFollowListOpen(
                                                    (props) => !props
                                                )
                                            }
                                        >
                                            {
                                                data?.data?.user?._count
                                                    ?.sendFollow
                                            }
                                        </td>
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
                                <PostIcon activated={isMyPosts} />
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
                                    <BookmarkIcon activated={!isMyPosts} />
                                </div>
                            ) : null}
                        </section>
                        <PostList
                            isMyPosts={isMyPosts}
                            userId={router?.query?.id}
                        />
                    </>
                )}
            </Layout>
            {followListOpen ? (
                <ChatAddModal
                    readonly={true}
                    isOpen={followListOpen}
                    setIsOpen={setFollowListOpen}
                    sendUserList={data?.data?.user?.sendFollow}
                    receiveUserList={data?.data?.user?.receiveFollow}
                />
            ) : null}
        </>
    );
}
