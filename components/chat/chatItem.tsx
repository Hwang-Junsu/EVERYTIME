import Image from "next/legacy/image";
import {useRouter} from "next/router";
import {dateToTime} from "@libs/utils";
import useOtherUser from "hooks/useOtherUser";
import {IChatItem} from "types/types";

export default function ChatItem({
  userId,
  lastChat,
  chatroomId,
  lastTimeStamp,
}: IChatItem) {
  const router = useRouter();
  const {data} = useOtherUser(userId);
  const onEnterChatroom = () => {
    router.push({
      pathname: `/chat/${chatroomId}`,
      query: {name: data?.user?.name},
    });
  };

  return (
    <>
      {data && (
        <div
          className="border-b-2 hover:bg-slate-100"
          onClick={onEnterChatroom}
        >
          <div className="flex justify-between p-3">
            <div className="px-6">
              <div className="flex space-x-5">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image src={data.user.image} layout="fill" alt="profile" />
                </div>
                <div>
                  <div>{data.user.name}</div>
                  <div>{lastChat}</div>
                </div>
              </div>
            </div>
            <time className="text-sm text-gray-500">
              {dateToTime(new Date(lastTimeStamp))}
            </time>
          </div>
        </div>
      )}
    </>
  );
}
