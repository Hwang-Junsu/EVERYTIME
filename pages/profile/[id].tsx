import Layout from "@components/common/layout";
import PostList from "@components/profile/postList";
import { api } from "@libs/api";
import { cls, convertUnitToKilo } from "@libs/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import ChatAddModal from "@components/chat/chatAddModal";
import PostIcon from "@components/svg/postIcon";
import { BookmarkIcon } from "@components/svg";
import ProfileCard from "@components/profile/profileCard";

export default function UserProfile() {
  const [followListOpen, setFollowListOpen] = useState<boolean>(false);
  const [isMyPosts, setIsMyPosts] = useState<boolean>(true);
  const router = useRouter();
  const { data: token } = useSession();

  const { data, refetch, isLoading } = useQuery(
    ["profile"],
    () => api.get(`/api/users/${router?.query?.id}`),
    { refetchOnWindowFocus: false, enabled: Boolean(router.query.id) }
  );

  useEffect(() => {
    refetch();
  }, [router.query.id, refetch]);

  return (
    <>
      <Layout seoTitle="Profile" hasTabBar>
        {isLoading ? null : (
          <>
            <header className="p-8 space-y-2">
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
            <section className="flex flex-row items-center justify-around px-3 py-2 mb-1">
              <div className="flex flex-col items-center justify-center p-4 bg-orange-200 rounded-full shadow-lg">
                <span>게시글</span>
                <span>{convertUnitToKilo(data?.data?.user?._count?.post)}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-blue-200 rounded-full shadow-lg">
                <span>북마크</span>
                <span>
                  {convertUnitToKilo(data?.data?.user?._count?.bookmark)}
                </span>
              </div>
              <div
                className="flex flex-col items-center justify-center p-4 bg-indigo-200 rounded-full shadow-lg cursor-pointer"
                onClick={() => setFollowListOpen((props) => !props)}
              >
                <span>팔로우</span>
                <span>
                  {convertUnitToKilo(data?.data?.user?._count?.receiveFollow)}
                </span>
              </div>
              <div
                className="flex flex-col items-center justify-center p-4 bg-pink-200 rounded-full shadow-lg cursor-pointer "
                onClick={() => setFollowListOpen((props) => !props)}
              >
                <span>팔로잉</span>
                <span>
                  {convertUnitToKilo(data?.data?.user?._count?.sendFollow)}
                </span>
              </div>
            </section>
            <section className="flex w-full h-12 space-x-2">
              <div
                className={cls(
                  "border-b-2 flex-grow flex items-center justify-center cursor-pointer",
                  isMyPosts ? "border-indigo-400" : ""
                )}
                onClick={() => setIsMyPosts(true)}
                role="presentation"
              >
                <PostIcon activated={isMyPosts} />
              </div>
              {data?.data?.user?.id === token?.user?.id ? (
                <div
                  className={cls(
                    "border-b-2 flex-grow flex items-center justify-center cursor-pointer",
                    !isMyPosts ? "border-indigo-400" : ""
                  )}
                  onClick={() => setIsMyPosts(false)}
                  role="presentation"
                >
                  <BookmarkIcon activated={!isMyPosts} />
                </div>
              ) : null}
            </section>
            <PostList isMyPosts={isMyPosts} userId={router?.query?.id} />
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
