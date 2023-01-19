import Image from "next/legacy/image";
import {useState} from "react";
import PostModal from "../modals/postModal";

interface IPostCardProps {
    postId: number;
    media: string;
    mediaType: string;
    thumbnail?: string;
}

export default function PostCard({
    postId,
    media,
    mediaType,
    thumbnail,
}: IPostCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div
                className="relative h-40 shadow-md object-fit"
                onClick={() => setIsOpen((props) => !props)}
            >
                {mediaType === "Image" ? (
                    <Image
                        src={media}
                        layout="fill"
                        className="object-fit"
                        alt="media"
                    />
                ) : (
                    <Image
                        src={thumbnail}
                        layout="fill"
                        className="object-contain "
                        alt="media"
                    />
                )}
            </div>
            {isOpen ? (
                <PostModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    postId={postId}
                />
            ) : null}
        </>
    );
}
