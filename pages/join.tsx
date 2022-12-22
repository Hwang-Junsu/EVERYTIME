import Button from "@components/button";
import Input from "@components/input";
import Head from "next/head";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {IRegisterRequest, IRegisterForm} from "types/types";

export default function Join() {
    const {register, handleSubmit} = useForm<IRegisterForm>();
    const onValid = (data: IRegisterRequest) => {
        console.log(data);
    };
    return (
        <>
            <Head>
                <title>JUNSTAGRAM</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <form
                    onSubmit={handleSubmit(onValid)}
                    className="flex flex-col w-3/4 p-3 py-16 mx-auto mb-4 space-y-10 border-2 border-solid"
                >
                    <div>
                        <h1 className="font-bold tracking-[-3px] text-4xl text-center">
                            JUNSTAGRAM
                        </h1>
                        <h2 className=" font-thin tracking-[-3px] text-xl text-center">
                            회원가입
                        </h2>
                    </div>
                    <div className="space-y-2">
                        <Input
                            register={register("email")}
                            type="text"
                            placeholder="이메일"
                        />
                        <Input
                            register={register("password")}
                            type="password"
                            placeholder="비밀번호"
                        />
                        <Input
                            register={register("password2")}
                            type="password"
                            placeholder="비밀번호 확인"
                        />
                        <Input
                            register={register("nickname")}
                            type="text"
                            placeholder="닉네임"
                        />
                    </div>
                    <Button text="회원가입" large />
                </form>
                <div className="w-3/4 p-3 mx-auto border-2 border-solid">
                    <Link href="/login">
                        <div className="font-bold text-center cursor-pointer hover:underline hover:text-blue-500">
                            계정이 이미 있습니다!
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
