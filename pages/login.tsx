import Button from "@components/button";
import Input from "@components/input";
import { api } from "@libs/api";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ILoginRequest } from "types/types";

export default function Login() {
  const { register, handleSubmit } = useForm<ILoginRequest>();
  const router = useRouter();
  const onValid = async (data: ILoginRequest) => {
    // const response = await api.post("/users/login", data);
    const response = await axios.post("http://localhost:80/users/login", data);
    if (response) {
      localStorage.setItem("accessToken", `Bearer ${response?.data?.token}`);
      router.push("/");
    } else {
      Swal.fire("아이디 혹은 비밀번호를 확인해주세요");
    }
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
