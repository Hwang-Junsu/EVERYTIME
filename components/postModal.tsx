import {cls} from "@libs/utils";
import Image from "next/legacy/image";
import BasicProfile from "images/basic_profile.jpg";
import {Dispatch, SetStateAction, useState} from "react";
import {useQuery} from "react-query";
import {api} from "@libs/api";
import Hashtags from "./feed/hashtags";
interface IModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface IPostModalProps extends IModalProps {
    postId: number;
    onLikeClick?: () => void;
    addComment?: (
        data: string,
        serFn: Dispatch<SetStateAction<string>>
    ) => void;
}

export default function PostModal({
    isOpen,
    setIsOpen,
    postId,
    onLikeClick,
    addComment,
}: IPostModalProps) {
    const {data, isLoading} = useQuery(["posts", postId], () =>
        api.get(`/api/posts/${postId}`)
    );
    const onClick = () => {
        setIsOpen((props) => !props);
    };
    const [input, setInput] = useState("");

    return (
        <>
            {isOpen ? (
                <div
                    onClick={onClick}
                    role="presentation"
                    className="fixed z-[999] top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        role="presentation"
                        className={cls(
                            `p-5 w-[430px] h-[600px] bg-white rounded-md overflow-hidden
`
                        )}
                    >
                        <div className="w-full p-3 space-y-3 border rounded-lg shadow-md">
                            <header className="flex justify-between">
                                <div className="flex items-center space-x-2">
                                    <Image
                                        src={
                                            data?.data?.post.user.image ||
                                            BasicProfile
                                        }
                                        width={48}
                                        height={48}
                                        alt="profileImage"
                                        className="w-8 h-8 rounded-full cursor-pointer bg-slate-500"
                                    />
                                    <h1 className="font-bold cursor-pointer">
                                        {data?.data?.post.author}
                                    </h1>
                                </div>
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
                            </header>
                            <div className="relative w-full h-56 bg-slate-600">
                                {data?.data?.post.mediaType === "Video" ? (
                                    <iframe
                                        src={data?.data?.post.media}
                                        allow="fullscreen"
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <Image
                                        src={data?.data?.post.media}
                                        className="object-contain "
                                        alt="postImage"
                                        layout="fill"
                                    />
                                )}
                            </div>
                            <div className="flex w-full space-x-3">
                                <div onClick={onLikeClick}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={cls(
                                            "",
                                            data?.data?.isLike ? "red" : "none"
                                        )}
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="cursor-pointer w-7 h-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                    </svg>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="cursor-pointer w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="cursor-pointer w-7 h-7"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                    />
                                </svg>
                            </div>
                            <div className="text-sm font-bold">{`좋아요 ${data?.data?.post._count.likes}개`}</div>
                            <article>
                                <div className="space-x-2">
                                    <span className="text-sm font-bold text-gray-500 cursor-pointer">
                                        {data?.data?.post.author}
                                    </span>
                                    <div className="inline-block text-sm text-gray-900">
                                        {data?.data?.post.title}
                                    </div>
                                </div>
                                <div>{data?.data?.post.content}</div>
                            </article>
                            <div className="space-x-2 text-blue-400">
                                <Hashtags
                                    hashtags={data?.data?.post?.hashtags}
                                />
                            </div>
                            <div className="text-sm tracking-tighter text-gray-500 cursor-pointer">
                                {`댓글 ${data?.data?.post._count.comments}개 모두 보기`}
                            </div>
                            <div className="relative ">
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
                                        onClick={() =>
                                            addComment(input, setInput)
                                        }
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
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
