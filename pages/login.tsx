import Button from "@components/common/button";
import Input from "@components/common/input";
import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {ILoginRequest} from "types/types";
import {signIn} from "next-auth/react";
import SignLayout from "@components/common/signLayout";
import Swal from "sweetalert2";

export default function Login() {
  const {register, handleSubmit} = useForm<ILoginRequest>();
  const router = useRouter();
  const onValid = async (data: ILoginRequest) => {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (response?.ok) router.push("/");
    else {
      Swal.fire("이메일과 비밀번호를 확인해주세요");
    }
  };
  const onGoogleLogin = async () => {
    await signIn("google", {
      redirect: false,
      callbackUrl: process.env.NEXT_PUBLIC_API_URL,
    });
  };

  return (
    <>
      <Head>
        <title>EVERYTIME</title>
      </Head>
      <SignLayout>
        <div className="flex flex-col items-center justify-center h-screen max-w-md px-4 ">
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col p-3 py-8 mx-auto mb-4 space-y-10"
          >
            <h1 className="font-bold tracking-[-3px] text-4xl text-center">
              EVERYTIME
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
              <div className="text-xl font-bold text-center cursor-pointer hover:underline hover:text-indigo-500">
                계정이 없으신가요?
              </div>
            </Link>
          </form>
          <div className="w-3/4 p-3 mx-auto space-y-2 ">
            <div className="flex flex-col items-center justify-center w-full space-y-2">
              <button
                onClick={onGoogleLogin}
                className="w-[210px] h-[50px] bg-[url('../images/btn_google_signin_light_focus_web.png')] bg-cover bg-no-repeat bg-center shadow-lg hover:scale-105"
              />

              {/* <button
                className="w-[210px] h-[50px] bg-[url('../images/kakao_login_medium_narrow.png')] bg-cover bg-no-repeat bg-center shadow-lg hover:scale-105"
                onClick={onKakaoLogin}
              /> */}
            </div>
          </div>
        </div>
      </SignLayout>
    </>
  );
}
