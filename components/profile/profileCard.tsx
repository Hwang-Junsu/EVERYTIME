import Button from "@components/common/button";
import {useSession} from "next-auth/react";
import Image from "next/legacy/image";
import BasicProfile from "images/basic_profile.jpg";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {api} from "@libs/api";
import {useRouter} from "next/router";
import EditModal from "@components/modals/editModal";

interface IProfileCardProps {
    image: string;
    name: string;
    introduce: string;
    id: string;
    isFollow: boolean;
}

export default function ProfileCard({
    image,
    name,
    introduce,
    id,
    isFollow,
}: IProfileCardProps) {
    const {data: token} = useSession();
    const queryClient = useQueryClient();
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const {mutate} = useMutation(
        () => api.post(`/api/users/${router?.query?.id}/follow`),
        {onSuccess: () => queryClient.invalidateQueries(["profile"])}
    );
    const onFollow = () => {
        mutate();
    };

    return (
        <>
            <section className="flex">
                <div className="relative flex-shrink-0 w-16 h-16 mr-8 overflow-hidden rounded-full object-fit bg-slate-500">
                    <Image
                        src={image || BasicProfile}
                        layout="fill"
                        alt="profileImage"
                    />
                </div>
                <div className="w-full space-y-1">
                    <div>
                        <p>{name || "NoName"}</p>
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                        {introduce || ""}
                    </div>
                    {id === token?.user?.id ? (
                        <div
                            className="w-2/3"
                            onClick={() => setIsEditOpen((props) => !props)}
                        >
                            <Button text="프로필 편집" />
                        </div>
                    ) : (
                        <div className="w-2/3" onClick={() => onFollow()}>
                            <Button text={isFollow ? "Unfollow" : "Follow"} />
                        </div>
                    )}
                </div>
            </section>{" "}
            {isEditOpen ? (
                <EditModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
            ) : null}
        </>
    );
}
