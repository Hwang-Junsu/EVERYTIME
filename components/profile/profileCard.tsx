import {useState} from "react";
import {useRouter} from "next/router";
import {useMutation, useQueryClient} from "react-query";
import {useSession} from "next-auth/react";
import Image from "next/legacy/image";
import Button from "@components/common/button";
import BasicProfile from "images/basic_profile.jpg";
import {api} from "@libs/api";
import EditModal from "@components/modals/editModal";
import {IProfileCardProps} from "types/types";

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
      <section className="flex flex-col items-center justify-center space-y-1">
        <div className="relative w-20 h-20 overflow-hidden rounded-full object-fit bg-slate-500">
          <Image src={image || BasicProfile} layout="fill" alt="profileImage" />
        </div>
        <div className="text-2xl">
          <p>{name || "NoName"}</p>
        </div>
        <div className="text-gray-600 text-md whitespace-nowrap">
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
      </section>
      {isEditOpen ? (
        <EditModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
      ) : null}
    </>
  );
}
