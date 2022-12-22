import Button from "@components/button";
import Input from "@components/input";
import Head from "next/head";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {ILoginRequest} from "types/types";

export default function Login() {
    const {register, handleSubmit} = useForm<ILoginRequest>();
    const onValid = (data: ILoginRequest) => {
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
                    <h1 className="font-bold tracking-[-3px] text-4xl text-center">
                        JUNSTAGRAM
                    </h1>
                    <div className="space-y-5">
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
                    </div>
                    <Button text="로그인" large />
                </form>
                <div className="w-3/4 p-3 mx-auto border-2 border-solid">
                    <Link href="/join">
                        <div className="font-bold text-center cursor-pointer hover:underline hover:text-blue-500">
                            계정이 없으신가요?
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
