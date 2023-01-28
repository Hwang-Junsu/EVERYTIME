import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { api } from "@libs/api";
import Feed from "@components/feed/feed";
import CommentsList from "@components/comments/commentsList";
import CommonModal from "./commonModal";
import { IPostModalProps } from "types/types";

export default function PostModal({
  isOpen,
  setIsOpen,
  postId,
}: IPostModalProps) {
  const { data, isLoading } = useQuery(["posts", postId], () =>
    api.get(`/api/posts/${postId}`)
  );
  const onClick = () => {
    setIsOpen((props) => !props);
  };

  return (
    <>
      {isLoading ? null : (
        <>
          {isOpen ? (
            <CommonModal onClick={onClick}>
              <section className="grid h-fit lg:grid-cols-2 lg:gap-2">
                <Feed post={data?.data} isModal />
                <CommentsList comments={data?.data.comments} />
              </section>
            </CommonModal>
          ) : null}
        </>
      )}
    </>
  );
}
