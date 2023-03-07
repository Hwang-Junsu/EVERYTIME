import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import Layout from "@components/common/layout";
import PostList from "@components/profile/postList";
import {cls, convertUnitToKilo} from "@libs/utils";
import ChatAddModal from "@components/chat/chatAddModal";
import ProfileCard from "@components/profile/profileCard";
import useOtherUser from "hooks/useOtherUser";
import {BookmarkIcon, PostIcon} from "@components/svg";

export default function UserProfile() {
  const [followListOpen, setFollowListOpen] = useState<boolean>(false);
  const [isMyPosts, setIsMyPosts] = useState<boolean>(true);
  const router = useRouter();
  const {data: token} = useSession();

  const {data, refetch, isLoading} = useOtherUser(String(router.query.id));

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
                  image={data.user.image}
                  name={data.user.name}
                  introduce={data.user.introduce}
                  id={data.user.id}
                  isFollow={data.isFollow}
                />
              )}
            </header>
            <section className="flex flex-row items-center justify-around px-3 py-2 mb-1">
              <div className="flex flex-col items-center justify-center p-4 bg-orange-200 rounded-full shadow-lg">
                <span>게시글</span>
                <span>{convertUnitToKilo(data?.user?._count?.post)}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-blue-200 rounded-full shadow-lg">
                <span>북마크</span>
                <span>{convertUnitToKilo(data?.user?._count?.bookmark)}</span>
              </div>
              <div
                className="flex flex-col items-center justify-center p-4 bg-indigo-200 rounded-full shadow-lg cursor-pointer"
                onClick={() => setFollowListOpen((props) => !props)}
              >
                <span>팔로우</span>
                <span>
                  {convertUnitToKilo(data?.user?._count?.receiveFollow)}
                </span>
              </div>
              <div
                className="flex flex-col items-center justify-center p-4 bg-pink-200 rounded-full shadow-lg cursor-pointer "
                onClick={() => setFollowListOpen((props) => !props)}
              >
                <span>팔로잉</span>
                <span>{convertUnitToKilo(data?.user?._count?.sendFollow)}</span>
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
              {data?.user?.id === token?.user?.id ? (
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
          sendUserList={data?.user?.sendFollow}
          receiveUserList={data?.user?.receiveFollow}
        />
      ) : null}
    </>
  );
}
