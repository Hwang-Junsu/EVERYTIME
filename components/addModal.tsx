import {cls} from "@libs/utils";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Input from "./input";
import TextArea from "./textarea";
import {useForm} from "react-hook-form";
import Button from "./button";
import {IAddPostRequest} from "types/types";
import {api} from "@libs/api";
import {useMutation, useQueryClient} from "react-query";
import Swal from "sweetalert2";
import {v4 as uuid} from "uuid";
import Image from "next/legacy/image";
import useUser from "hooks/useUser";

interface IModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface IAddImageData {
    title: string;
    content: string;
    media: string;
    author: string;
    hashtags: string;
    mediaType?: string;
    thumbnail?: string;
}

export default function AddModal({isOpen, setIsOpen}: IModalProps) {
    const [hashtags, setHashtags] = useState<string[]>([]);
    const [hashtagInput, setHashtagInput] = useState<string>("");
    const addHashtag = () => {
        if (hashtags.length >= 5) {
            Swal.fire("해시태그는 최대 5개 입니다.");
            return;
        }
        setHashtags((props) => [...props, hashtagInput]);
        setHashtagInput("");
    };
    const deleteHashtag = (selectedHashtag: string) => {
        setHashtags((props) =>
            props.filter((hashtag) => hashtag !== selectedHashtag)
        );
    };
    const {register, handleSubmit, watch} = useForm<IAddPostRequest>();
    const queryClient = useQueryClient();
    const {user} = useUser();
    const {mutate} = useMutation(
        (data: IAddImageData) => api.post("/api/posts", data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
                queryClient.invalidateQueries(["postlist"]);
            },
        }
    );
    const media = watch("media");
    const [mediaPreview, setMediaPreview] = useState("");
    const [isVideo, setIsVideo] = useState(false);
    useEffect(() => {
        if (media && media.length > 0) {
            const file = media[0];
            if (file.type.includes("video")) setIsVideo(true);
            else setIsVideo(false);
            setMediaPreview(URL.createObjectURL(file));
        }
    }, [media]);
    const onClick = () => {
        setIsOpen((props) => !props);
    };
    const onValid = async (data: IAddPostRequest) => {
        const formData = new FormData();
        if (data.media[0].type.includes("image")) {
            formData.append("file", data.media[0]);
            const {
                data: {uploadURL},
            } = await api.get("/api/image");
            const {
                data: {
                    result: {id},
                },
            } = await api.post(uploadURL, formData);
            const addImageData = {
                ...data,
                author: user.name,
                hashtags: hashtags.join(","),
                media: `https://imagedelivery.net/_svxocQ2IUnWarpkNEZZ5A/${id}/public`,
            };
            mutate(addImageData);
        } else if (data.media[0].type.includes("video")) {
            formData.append("file", data.media[0]);
            const {
                data: {uploadURL, uid},
            } = await api.get("/api/videos");
            console.log(uploadURL, uid);

            await api.post(uploadURL, formData);

            const {
                data: {
                    result: {preview, thumbnail},
                },
            } = await api.get(
                `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_CLIENT_ID}/stream/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const addVideoData = {
                ...data,
                author: user.name,
                hashtags: hashtags.join(","),
                mediaType: "Video",
                media: preview as string,
                thumbnail,
            };
            mutate(addVideoData);
        } else {
            Swal.fire("올바른 형식의 파일을 넣어주세요.");
            return;
        }
        setIsOpen((props) => !props);
    };
    return (
        <>
            {isOpen ? (
                <div
                    onClick={onClick}
                    role="presentation"
                    className="fixed z-[999] top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        role="presentation"
                        className={cls(
                            `p-5 w-[480px] h-[650px] bg-white rounded-md overflow-hidden
`
                        )}
                    >
                        <form
                            className="space-y-2 h-[650px] pb-20 overflow-scroll scrollbar-none"
                            onSubmit={handleSubmit(onValid)}
                        >
                            {mediaPreview ? (
                                <div className="relative object-cover w-full shadow-lg h-60">
                                    {isVideo ? (
                                        <iframe
                                            src={mediaPreview}
                                            className="w-full h-full"
                                            allow="autoplay"
                                        />
                                    ) : (
                                        <Image
                                            alt="imagePreview"
                                            src={mediaPreview}
                                            layout="fill"
                                        />
                                    )}
                                </div>
                            ) : (
                                <label
                                    htmlFor="upload"
                                    className="flex flex-col items-center justify-center w-full p-10 border-4 border-dotted rounded-md "
                                >
                                    <input
                                        {...register("media")}
                                        id="upload"
                                        type="file"
                                        className="hidden "
                                    />
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-20 h-20"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-2xl font-bold tracking-tighter">
                                        UPLOAD IMAGE / VIDEO
                                    </div>
                                </label>
                            )}
                            <div className="space-y-2">
                                <span>Title</span>
                                <Input
                                    type="text"
                                    register={register("title")}
                                    placeholder="제목을 작성해주세요."
                                />
                            </div>
                            <div>
                                <span>Content</span>
                                <TextArea
                                    register={register("content")}
                                    placeholder="내용을 작성해주세요."
                                />
                            </div>
                            <div>
                                <span>HashTag</span>
                                <div className="flex space-x-3">
                                    <input
                                        className={cls(
                                            `bg-white appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`
                                        )}
                                        type="text"
                                        value={hashtagInput}
                                        onChange={(e) =>
                                            setHashtagInput(e.target.value)
                                        }
                                        placeholder="해시태그를 추가하세요"
                                    />
                                    <div
                                        onClick={addHashtag}
                                        className="flex items-center justify-center w-20 text-white bg-blue-400 rounded-md"
                                    >
                                        추가
                                    </div>
                                </div>
                                <ul className="flex flex-wrap items-center space-x-4 list-none">
                                    {hashtags.map((hashtag) => (
                                        <li
                                            className="flex items-center justify-between px-3 py-1 mt-2 text-sm rounded-lg bg-slate-300"
                                            key={uuid()}
                                        >
                                            <span>{hashtag}</span>
                                            <span
                                                onClick={() =>
                                                    deleteHashtag(hashtag)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-4 h-4 ml-2 text-center"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Button type="submit" text="Add Post" />
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
