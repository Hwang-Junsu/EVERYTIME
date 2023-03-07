import Image from "next/legacy/image";
import {ICommentWithUser} from "types/types";

export default function Comment({comment}: {comment: ICommentWithUser}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-8 h-8 overflow-hidden rounded-full bg-slate-400">
        <Image src={comment.user.image} layout="fill" alt="userProfile" />
      </div>
      <div className="text-gray-900 text-md whitespace-nowrap">
        {comment.user.name}
      </div>
      <div className="text-gray-700 truncate">{comment.content}</div>
    </div>
  );
}
