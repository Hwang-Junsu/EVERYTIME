import Button from "@components/button";
import Input from "@components/input";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ILoginRequest } from "types/types";

export default function Login() {
  const { register, handleSubmit } = useForm<ILoginRequest>();
  const onValid = (data: ILoginRequest) => {
    console.log(data);
  };
  return (
    <>
      <Head>
        <title>JUNSTAGRAM</title>
      </Head>
      <div className="mt-16 px-4">
        <form
          onSubmit={handleSubmit(onValid)}
          className="w-3/4 border-solid border-2 p-3 flex flex-col space-y-10 mx-auto py-16 mb-4"
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
          <Button text="로그인" />
        </form>
        <div className="mx-auto w-3/4 border-solid border-2 p-3">
          <Link href="/join">
            <div className="text-center font-bold cursor-pointer hover:underline hover:text-blue-500">
              계정이 없으신가요?
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
