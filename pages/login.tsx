import Button from "@components/common/button";
import Input from "@components/common/input";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {ILoginRequest} from "types/types";
import {signIn} from "next-auth/react";

export default function Login() {
    const {register, handleSubmit} = useForm<ILoginRequest>();
    const router = useRouter();
    const onValid = async (data: ILoginRequest) => {
        const response = await signIn("credentials", {
            ...data,
            redirect: false,
        });
        if (response?.ok) router.push("/");
    };
    const onGoogleLogin = async () => {
        await signIn("google", {
            redirect: false,
            callbackUrl: "http://localhost:3000",
        });
    };
    const onKakaoLogin = async () => {
        await signIn("kakao", {
            redirect: false,
            callbackUrl: "http://localhost:3000",
        });
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>JUNSTAGRAM</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-screen px-4">
                <form
                    onSubmit={handleSubmit(onValid)}
                    className="flex flex-col w-3/4 p-3 py-8 mx-auto mb-4 space-y-10 border-2 border-solid"
                >
                    <h1 className="font-bold tracking-[-3px] text-4xl text-center font-titleFont">
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
                    <Link href="/join">
                        <div className="font-bold text-center cursor-pointer hover:underline hover:text-blue-500">
                            계정이 없으신가요?
                        </div>
                    </Link>
                </form>
                <div className="w-3/4 p-3 mx-auto space-y-2 border-2 border-solid">
                    <div className="flex flex-col items-center justify-center w-full space-y-2">
                        <button
                            onClick={onGoogleLogin}
                            className="w-[210px] h-[50px] bg-[url('../images/btn_google_signin_light_focus_web.png')] bg-cover bg-no-repeat bg-center shadow-lg hover:scale-105"
                        />

                        <button
                            className="w-[210px] h-[50px] bg-[url('../images/kakao_login_medium_narrow.png')] bg-cover bg-no-repeat bg-center shadow-lg hover:scale-105"
                            onClick={onKakaoLogin}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
