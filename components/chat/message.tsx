import Image from "next/legacy/image";
import {cls, dateToTime} from "@libs/utils";
import useOtherUser from "hooks/useOtherUser";
import {IMessage} from "types/types";

export default function Message({userId, timeStamp, msg, isMine}: IMessage) {
  const {data} = useOtherUser(userId);
  return (
    <>
      {data && (
        <div
          className={cls(
            "flex items-center space-x-2",
            isMine ? "flex-row-reverse space-x-reverse" : ""
          )}
        >
          {isMine ? null : (
            <div className="relative w-10 h-10 overflow-hidden rounded-full">
              <Image src={data?.user?.image} layout="fill" alt="profile" />
            </div>
          )}
          <div>
            {isMine ? null : <div className="text-sm">{data?.user?.name}</div>}
            <div className="w-full px-3 py-1 bg-blue-400 rounded-lg">{msg}</div>
          </div>
          <div className="text-[12px] pt-5 text-gray-800">
            {dateToTime(new Date(timeStamp))}
          </div>
        </div>
      )}
    </>
  );
}
