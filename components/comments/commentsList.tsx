import {Comment as IComment, User} from "@prisma/client";
import Comment from "./comment";

interface ICommentWithUser extends IComment {
    user: User;
}

export default function CommentsList({
    comments,
}: {
    comments: ICommentWithUser[];
}) {
    return (
        <div className="w-full p-5 border-2 rounded-md hidden lg:block">
            <p>댓글</p>
            <div className="h-[470px] flex mt-2 flex-col space-y-2 overflow-auto scrollbar-none">
                {comments.map((comment: ICommentWithUser) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
