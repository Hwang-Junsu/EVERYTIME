import {cls} from "@libs/utils";
import {Dispatch, SetStateAction} from "react";
import {useQuery} from "react-query";
import {api} from "@libs/api";
import Feed from "@components/feed/feed";
import CommentsList from "@components/comments/commentsList";

interface IModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface IPostModalProps extends IModalProps {
    postId: number;
}

export default function PostModal({
    isOpen,
    setIsOpen,
    postId,
}: IPostModalProps) {
    const {data, isLoading} = useQuery(["posts", postId], () =>
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
                        <div
                            onClick={onClick}
                            role="presentation"
                            className="fixed z-[999] top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                role="presentation"
                                className={cls(
                                    `p-5 min-w-[430px] lg:w-[900px] h-[600px] bg-white rounded-md overflow-hidden
`
                                )}
                            >
                                <section className="h-fit grid lg:grid-cols-2 lg:gap-2">
                                    <Feed post={data?.data} isModal />
                                    <CommentsList
                                        comments={data?.data.comments}
                                    />
                                </section>
                            </div>
                        </div>
                    ) : null}
                </>
            )}
        </>
    );
}
