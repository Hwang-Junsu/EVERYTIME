import Button from "@components/button";
import Input from "@components/input";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { IRegisterRequest, IRegisterForm } from "types/types";

export default function Join() {
  const { register, handleSubmit } = useForm<IRegisterForm>();
  const onValid = (data: IRegisterRequest) => {
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
          <Button text="회원가입" />
        </form>
        <div className="mx-auto w-3/4 border-solid border-2 p-3">
          <Link href="/login">
            <div className="text-center font-bold cursor-pointer hover:underline hover:text-blue-500">
              계정이 이미 있습니다!
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
