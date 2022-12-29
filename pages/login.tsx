import Button from "@components/button";
import Input from "@components/input";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ILoginRequest } from "types/types";
import { signIn } from "next-auth/react";

export default function Login() {
  const { register, handleSubmit } = useForm<ILoginRequest>();
  const router = useRouter();
  const onValid = async (data: ILoginRequest) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (response?.ok) router.push("/");
  };
  const onGoogleLogin = async () => {
    const response = await signIn("google", { redirect: false });
  };
  const onKakaoLogin = async () => {
    const response = await signIn("kakao", { redirect: false });
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
          <button onClick={onGoogleLogin}>구글 로그인</button>
          <button onClick={onKakaoLogin}>카카오 로그인</button>
        </div>
      </div>
    </>
  );
}
