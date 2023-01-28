import useOtherUser from "hooks/useOtherUser";
import { useRouter } from "next/router";
import Image from "next/legacy/image";

export default function RecentChatItem({ chatroomId, userId }) {
  const { data } = useOtherUser(userId);
  const router = useRouter();
  return (
    <>
      {data && (
        <div
          className="flex flex-col items-center justify-center space-y-1"
          onClick={() =>
            router.push({
              pathname: `/chat/${chatroomId}`,
              query: { name: data.user.name },
            })
          }
        >
          <div className="relative w-16 h-16 overflow-hidden rounded-full cursor-pointer hover:ring-4 ring-offset-2 ring-indigo-400">
            <Image src={data.user.image} layout="fill" alt="profile" />
          </div>
          <div className="text-sm">{data.user.name}</div>
        </div>
      )}
    </>
  );
}
