import {Post, User} from "@prisma/client";
import Image from "next/legacy/image";
import {Dispatch, SetStateAction, useState} from "react";
import BasicProfile from "images/basic_profile.jpg";
import {useMutation, useQueryClient} from "react-query";
import {api} from "@libs/api";
import {cls} from "@libs/utils";
import PostModal from "../modals/postModal";
import Hashtags from "./hashtags";
import {useRouter} from "next/router";
import EditMenu from "./edit";
import {useSession} from "next-auth/react";
import {BookmarkIcon, BubbleIcon, HeartIcon} from "@components/svg";

interface ICount {
    comments: number;
    likes: number;
}

interface IPostProps extends Post {
    isLike: boolean;
    isBookmark: boolean;
    user: User;
    _count: ICount;
}

interface IFeedProps {
    post: IPostProps;
    isModal?: boolean;
}

export default function Feed({post, isModal = false}: IFeedProps) {
    const {
        title,
        media,
        content,
        _count,
        user,
        id,
        mediaType,
        isLike,
        isBookmark,
        hashtags,
    } = post;

    const router = useRouter();
    const [input, setInput] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [isLikeState, setIsLikeState] = useState<boolean>(isLike);
    const [likeCount, setLikeCount] = useState<number>(_count.likes);
    const [isBookmarkState, setIsBookmarkState] = useState<boolean>(isBookmark);

    const {data: token} = useSession();
    const queryClient = useQueryClient();
    const {mutate: likeMutate} = useMutation(
        () => api.post(`/api/posts/${id}/like`),
        {
            onMutate: () => {
                setIsLikeState((props) => !props);
                setLikeCount((props) => (isLikeState ? props - 1 : props + 1));
            },
            onError: () => {},
        }
    );
    const {mutate: commentMutate} = useMutation(
        ({content}: {content: string}) =>
            api.post(`/api/comments/${id}`, {content}),
        {onSuccess: () => queryClient.invalidateQueries(["posts"])}
    );
    const {mutate: bookmarkMutate} = useMutation(
        () => api.post(`/api/posts/${id}/bookmark`),
        {
            onMutate: () => {
                setIsBookmarkState((props) => !props);
            },
        }
    );
    const {mutate: deletePostMutation} = useMutation(
        () => api.delete(`/api/posts/${id}`),
        {onSuccess: () => queryClient.invalidateQueries(["posts"])}
    );
    const onLikeClick = () => {
        likeMutate(null, {
            onSuccess: () => {
                return queryClient.invalidateQueries(["posts"]);
            },
        });
    };
    const onBookmarkClick = () => {
        bookmarkMutate();
        setIsEdit(false);
    };
    const onDelete = () => {
        deletePostMutation();
        setIsEdit(false);
    };
    const setOpenPost = () => {
        setIsOpen((props) => !props);
    };
    const addComment = (
        data: string,
        setFn: Dispatch<SetStateAction<string>>
    ) => {
        commentMutate({content: data});
        setFn("");
    };

    return (
        <>
            {post && (
                <div className="w-full h-fit p-3 space-y-3 border rounded-2xl shadow-md bg-indigo-100">
                    <header className="flex justify-between">
                        <div
                            className="flex items-center space-x-2"
                            onClick={() => router.push(`/profile/${user.id}`)}
                        >
                            {user && (
                                <Image
                                    src={user.image || BasicProfile}
                                    width={55}
                                    height={55}
                                    alt="profileImage"
                                    className="w-8 h-8 rounded-full cursor-pointer bg-slate-500"
                                />
                            )}
                            <h1 className="font-bold cursor-pointer text-lg">
                                {user.name}
                            </h1>
                        </div>
                        <div className="relative">
                            <div onClick={() => setIsEdit((props) => !props)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-8 h-8 cursor-pointer"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                    />
                                </svg>
                            </div>
                            {isEdit ? (
                                <EditMenu
                                    onDelete={onDelete}
                                    onBookmark={onBookmarkClick}
                                    isMine={user.id === token.user.id}
                                />
                            ) : null}
                        </div>
                    </header>

                    <div
                        className={cls(
                            "relative rounded-2xl w-full overflow-hidden group",
                            isModal ? "h-[380px]" : "h-[500px]"
                        )}
                    >
                        <div
                            className={cls(
                                " translate-y-56 group-hover:translate-y-0 transition-transform ease-in-out duration-300 absolute z-10 w-full bg-slate-300 opacity-80 bottom-0",
                                mediaType === "Video"
                                    ? "space-y-0 px-4 py-2"
                                    : "space-y-2 p-4"
                            )}
                        >
                            <article>
                                <div className="space-x-2">
                                    <span className="text-sm font-bold text-gray-500 cursor-pointer">
                                        {user.name}
                                    </span>
                                    <div className="inline-block text-sm text-gray-900">
                                        {title}
                                    </div>
                                </div>
                                <div>{content}</div>
                            </article>
                            <div className="text-sm font-bold">{`좋아요 ${likeCount}개`}</div>
                            <Hashtags hashtags={hashtags} />
                            <div
                                onClick={setOpenPost}
                                className="text-sm tracking-tighter text-gray-500 cursor-pointer"
                            >
                                {`댓글 ${_count.comments}개 모두 보기`}
                            </div>
                        </div>
                        {mediaType === "Video" ? (
                            <iframe
                                src={media}
                                allow="fullscreen"
                                className="w-full h-full"
                            />
                        ) : (
                            <Image
                                src={media}
                                className="object-cover"
                                alt="postImage"
                                layout="fill"
                            />
                        )}
                    </div>
                    <div className="flex space-x-3">
                        <div onClick={onLikeClick}>
                            <HeartIcon activated={isLikeState} />
                        </div>
                        {isModal ? null : (
                            <div onClick={setOpenPost}>
                                <BubbleIcon />
                            </div>
                        )}
                        <div onClick={onBookmarkClick}>
                            <BookmarkIcon activated={isBookmarkState} />
                        </div>
                    </div>
                    <form className="relative ">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="댓글을 입력해주세요"
                            className="w-full p-2 px-4 border rounded-md focus:outline-blue-400"
                        />
                        <div className="absolute cursor-pointer right-2 top-2">
                            <button
                                type="button"
                                className="text-blue-400"
                                onClick={() => addComment(input, setInput)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {isOpen ? (
                <PostModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    postId={post.id}
                />
            ) : null}
        </>
    );
}
