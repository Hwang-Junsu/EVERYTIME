import {Comment as IComment, User} from "@prisma/client";
import Image from "next/legacy/image";

interface ICommentWithUser extends IComment {
    user: User;
}

export default function Comment({comment}: {comment: ICommentWithUser}) {
    return (
        <div className="flex space-x-2 items-center">
            <div className="relative h-8 w-8 bg-slate-400 rounded-full overflow-hidden">
                <Image
                    src={comment.user.image}
                    layout="fill"
                    alt="userProfile"
                />
            </div>
            <div className="text-md text-gray-900 whitespace-nowrap">
                {comment.user.name}
            </div>
            <div className="text-gray-700 truncate">{comment.content}</div>
        </div>
    );
}
