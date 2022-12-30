import Image from "next/legacy/image";
import { useState } from "react";
import PostModal from "../postModal";

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
        className="relative  h-40 object-fit shadow-md"
        onClick={() => setIsOpen((props) => !props)}
      >
        {mediaType === "Image" ? (
          <Image
            src={`https://imagedelivery.net/_svxocQ2IUnWarpkNEZZ5A/${media}/public`}
            layout="fill"
            className="object-fit"
          />
        ) : (
          <Image src={thumbnail} layout="fill" className=" object-contain" />
        )}
      </div>
      {isOpen ? (
        <PostModal isOpen={isOpen} setIsOpen={setIsOpen} postId={postId} />
      ) : null}
    </>
  );
}
