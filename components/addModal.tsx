import { cls } from "@libs/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Input from "./input";
import TextArea from "./textarea";
import { useForm } from "react-hook-form";
import Button from "./button";
import { IAddPostRequest } from "types/types";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddModal({ isOpen, setIsOpen }: IModalProps) {
  const { register, handleSubmit, watch } = useForm<IAddPostRequest>();
  const media = watch("media");
  const [mediaPreview, setMediaPreview] = useState("");
  useEffect(() => {
    if (media && media.length > 0) {
      const file = media[0];
      setMediaPreview(URL.createObjectURL(file));
    }
  }, [media]);
  const onClick = () => {
    setIsOpen((props) => !props);
  };
  const onValid = (data: IAddPostRequest) => {
    const formData = new FormData();

    formData.append("media", data.media[0]);
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("hashtag", JSON.stringify(data.hashtag));

    console.log(formData);
    setIsOpen((props) => !props);
  };
  return (
    <>
      {isOpen ? (
        <div
          onClick={onClick}
          role="presentation"
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
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
                <img
                  alt="imagePreview"
                  src={mediaPreview}
                  className="w-full object-cover shadow-lg"
                />
              ) : (
                <label
                  htmlFor="upload"
                  className=" border-4 border-dotted w-full flex flex-col rounded-md justify-center items-center p-10"
                >
                  <input
                    {...register("media")}
                    id="upload"
                    type="file"
                    className=" hidden"
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
                  <div className="font-bold tracking-tighter text-2xl">
                    UPLOAD IMAGE
                  </div>
                </label>
              )}
              <div className="space-y-2">
                <span>Title</span>
                <Input type="text" register={register("title")} />
              </div>
              <div>
                <span>Content</span>
                <TextArea register={register("content")} />
              </div>
              <div>
                <span>HashTag</span>
                <Input type="text" register={register("hashtag")} />
              </div>
              <Button text="Add Post" />
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}