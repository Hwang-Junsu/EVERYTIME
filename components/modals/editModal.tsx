import { cls } from "@libs/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Input from "../common/input";
import TextArea from "../common/textarea";
import { useForm } from "react-hook-form";
import Button from "../common/button";
import { IEditProfile } from "types/types";
import Image from "next/legacy/image";
import { api } from "@libs/api";
import { useMutation } from "react-query";
import { useSession } from "next-auth/react";
import { useQueryClient } from "react-query";
import CommonModal from "./commonModal";
import Loading from "@components/common/loading";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface IUpdateProfileRequest {
  image?: string;
  introduce: string;
  name: string;
}

export default function EditModal({ isOpen, setIsOpen }: IModalProps) {
  const { data: token } = useSession();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit, watch } = useForm<IEditProfile>();
  const media = watch("profileImage");
  const [mediaPreview, setMediaPreview] = useState("");
  const { mutate } = useMutation(
    (data: IUpdateProfileRequest) =>
      api.patch(`/api/users/${token?.user?.id}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
      },
    }
  );
  useEffect(() => {
    if (media && media.length > 0) {
      const file = media[0];
      setMediaPreview(URL.createObjectURL(file));
    }
  }, [media]);
  const onClick = () => {
    setIsOpen((props) => !props);
  };
  const onValid = async (data: IEditProfile) => {
    setIsLoading(true);
    const formData = new FormData();
    let addImageData: IUpdateProfileRequest = {
      introduce: data.introduce,
      name: data.name,
    };
    if (Boolean(data.profileImage[0])) {
      formData.append("file", data.profileImage[0]);
      const {
        data: { uploadURL },
      } = await api.get("/api/image");
      const {
        data: {
          result: { id },
        },
      } = await api.post(uploadURL, formData);
      addImageData = {
        ...addImageData,
        image: `https://imagedelivery.net/_svxocQ2IUnWarpkNEZZ5A/${id}/public`,
      };
    }

    mutate(addImageData);
    setIsLoading(false);
    setIsOpen((props) => !props);
  };
  return (
    <>
      {isOpen ? (
        <CommonModal onClick={onClick}>
          <form
            className="space-y-2 h-[650px] pb-20 overflow-scroll scrollbar-none"
            onSubmit={handleSubmit(onValid)}
          >
            {mediaPreview ? (
              <div className="relative mx-auto overflow-hidden rounded-full shadow-lg w-60 h-60">
                <Image
                  alt="imagePreview"
                  src={mediaPreview}
                  layout="fill"
                  className="object-cover"
                />
              </div>
            ) : (
              <label
                htmlFor="upload"
                className="relative flex flex-col items-center justify-center p-10 mx-auto border-4 border-dotted rounded-full w-60 h-60 "
              >
                <input
                  {...register("profileImage")}
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
                <div className="text-2xl font-bold tracking-tighter text-center">
                  UPLOAD IMAGE
                </div>
              </label>
            )}
            <div className="space-y-2">
              <span>Nickname</span>
              <Input type="text" register={register("name")} />
            </div>
            <div>
              <span>Introduce</span>
              <TextArea register={register("introduce")} />
            </div>

            <Button text="Edit Profile" />
          </form>
        </CommonModal>
      ) : null}
      {isLoading ? <Loading /> : null}
    </>
  );
}
