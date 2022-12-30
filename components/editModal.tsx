import {cls} from "@libs/utils";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Input from "./input";
import TextArea from "./textarea";
import {useForm} from "react-hook-form";
import Button from "./button";
import {IEditProfile} from "types/types";

interface IModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditModal({isOpen, setIsOpen}: IModalProps) {
    const {register, handleSubmit, watch} = useForm<IEditProfile>();
    const media = watch("profileImage");
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
    const onValid = (data: IEditProfile) => {
        const formData = new FormData();

        formData.append("media", data.profileImage[0]);
        formData.append("title", data.nickname);
        formData.append("content", data.introduce);

        console.log(formData);
        setIsOpen((props) => !props);
    };
    return (
        <>
            {isOpen ? (
                <div
                    onClick={onClick}
                    role="presentation"
                    className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
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
                                    className="object-cover w-full shadow-lg"
                                />
                            ) : (
                                <label
                                    htmlFor="upload"
                                    className="flex flex-col items-center justify-center w-full p-10 border-4 border-dotted rounded-md "
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
                                    <div className="text-2xl font-bold tracking-tighter">
                                        UPLOAD IMAGE
                                    </div>
                                </label>
                            )}
                            <div className="space-y-2">
                                <span>Nickname</span>
                                <Input
                                    type="text"
                                    register={register("nickname")}
                                />
                            </div>
                            <div>
                                <span>Introduce</span>
                                <TextArea register={register("introduce")} />
                            </div>

                            <Button text="Edit Profile" />
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}
