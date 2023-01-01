import { cls } from "@libs/utils";
import Image from "next/legacy/image";

interface IMessage {
  userName: string;
  timeStamp: string;
  msg: string;
  userImage: string;
  isMine: boolean;
}

export default function Message({
  userName,
  timeStamp,
  msg,
  userImage,
  isMine,
}: IMessage) {
  return (
    <div
      className={cls(
        "flex items-center space-x-2",
        isMine ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      {isMine ? null : (
        <div className="w-10 h-10 rounded-full overflow-hidden relative">
          <Image src={userImage} layout="fill" />
        </div>
      )}
      <div>
        {isMine ? null : <div className="text-sm">{userName}</div>}
        <div className="w-full bg-blue-400 px-3 py-1 rounded-lg">{msg}</div>
      </div>
      <div className="text-[12px] pt-5 text-gray-800">{timeStamp}</div>
    </div>
  );
}
