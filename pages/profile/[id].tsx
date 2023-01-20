import Button from "@components/common/button";
import EditModal from "@components/modals/editModal";
import Layout from "@components/common/layout";
import PostList from "@components/profile/postList";
import {api} from "@libs/api";
import {cls} from "@libs/utils";
import Image from "next/legacy/image";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useQuery, useMutation, useQueryClient} from "react-query";
import BasicProfile from "images/basic_profile.jpg";
import {useSession} from "next-auth/react";
import ChatAddModal from "@components/chat/chatAddModal";
import PostIcon from "@components/svg/postIcon";
import {BookmarkIcon} from "@components/svg";

export default function UserProfile() {
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [followListOpen, setFollowListOpen] = useState<boolean>(false);
    const [isMyPosts, setIsMyPosts] = useState<boolean>(true);
    const queryClient = useQueryClient();
    const router = useRouter();
    const {data: token} = useSession();

    const {data, refetch, isLoading} = useQuery(
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
                {isLoading ? null : (
                    <>
                        <header className="p-8 space-y-2 border-b-[1px]">
                            <section className="flex">
                                <div className="relative flex-shrink-0 w-16 h-16 mr-8 overflow-hidden rounded-full object-fit bg-slate-500">
                                    {data && (
                                        <Image
                                            src={
                                                data?.data?.user?.image ||
                                                BasicProfile
                                            }
                                            layout="fill"
                                            alt="profileImage"
                                        />
                                    )}
                                </div>
                                <div className="w-full space-y-1">
                                    <div>
                                        <p>
                                            {data?.data?.user?.name || "NoName"}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-600 whitespace-nowrap">
                                        {data?.data?.user?.introduce || ""}
                                    </div>
                                    {data?.data?.user?.id ===
                                    token?.user?.id ? (
                                        <div
                                            className="w-2/3"
                                            onClick={() =>
                                                setIsEditOpen((props) => !props)
                                            }
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
            {isEditOpen ? (
                <EditModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
            ) : null}
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
