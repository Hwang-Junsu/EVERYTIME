import Button from "@components/common/button";
import Input from "@components/common/input";
import SignLayout from "@components/common/signLayout";
import {api} from "@libs/api";
import Head from "next/head";
import Link from "next/link";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import {IRegisterRequest, IRegisterForm} from "types/types";

export default function Join() {
    const {register, handleSubmit} = useForm<IRegisterForm>();
    const onValid = async (data: IRegisterRequest) => {
        try {
            await api.post("/api/users/register", data);
        } catch (error) {
            if (error.response.status === 400) {
                Swal.fire("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            }
            if (error.response.status === 409) {
                Swal.fire("이메일 계정이 이미 존재합니다.");
            }
        }
    };
    return (
        <>
            <Head>
                <title>EVERYTIME</title>
            </Head>
            <SignLayout>
                <div className=" max-w-md flex flex-col items-center justify-center h-screen px-4">
                    <form
                        onSubmit={handleSubmit(onValid)}
                        className="flex flex-col p-3 py-16 mx-auto mb-4 space-y-10"
                    >
                        <div>
                            <h1 className="font-bold tracking-[-3px] text-4xl text-center">
                                EVERYTIME
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
                                register={register("name")}
                                type="text"
                                placeholder="닉네임"
                            />
                        </div>
                        <Button text="회원가입" large />
                        <Link href="/login">
                            <div className="font-bold text-xl text-center cursor-pointer hover:underline hover:text-blue-500">
                                계정이 이미 있습니다!
                            </div>
                        </Link>
                    </form>
                </div>
            </SignLayout>
        </>
    );
}
