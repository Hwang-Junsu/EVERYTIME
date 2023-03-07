import {useState} from "react";
import Image from "next/legacy/image";
import {IPostCardProps} from "types/types";
import PostModal from "../modals/postModal";

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
        className="relative overflow-hidden shadow-md cursor-pointer rounded-2xl w-28 h-28 phone:w-40 phone:h-40"
        onClick={() => setIsOpen((props) => !props)}
      >
        {mediaType === "Image" ? (
          <Image
            src={media}
            layout="fill"
            alt="media"
            className="object-cover"
          />
        ) : (
          <Image
            src={thumbnail}
            layout="fill"
            alt="media"
            className="object-cover"
          />
        )}
      </div>
      {isOpen ? (
        <PostModal isOpen={isOpen} setIsOpen={setIsOpen} postId={postId} />
      ) : null}
    </>
  );
}
