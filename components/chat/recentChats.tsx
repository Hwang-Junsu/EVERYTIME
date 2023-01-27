import { api } from "@libs/api";
import useUser from "hooks/useUser";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function RecentChats() {
  const { data } = useQuery(["chat"], () => api.get("/api/chat?count=6"));
  const router = useRouter();
  const { user } = useUser();

  return (
    <>
      {data && (
        <section className="px-5 pt-5 space-y-2">
          <p className="text-xl text-bold">Recent Chats</p>
          {data && (
            <div className="flex p-3 space-x-5 bg-indigo-200 rounded-md justify-items-start">
              {data?.data?.chatrooms.map((chat) => {
                const counterMember =
                  chat.chatroom.members[0].user.id === user?.id
                    ? chat.chatroom.members[1]
                    : chat.chatroom.members[0];
                return (
                  <div
                    key={chat.chatroom.id}
                    className="flex flex-col items-center justify-center space-y-1"
                    onClick={() =>
                      router.push({
                        pathname: `/chat/${chat.chatroom.id}`,
                        query: { name: counterMember.user.name },
                      })
                    }
                  >
                    <div className="relative w-16 h-16 overflow-hidden rounded-full cursor-pointer hover:ring-4 ring-offset-2 ring-indigo-400">
                      <Image
                        src={counterMember.user.image}
                        layout="fill"
                        alt="profile"
                      />
                    </div>
                    <div className="text-sm">{counterMember.user.name}</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </>
  );
}
