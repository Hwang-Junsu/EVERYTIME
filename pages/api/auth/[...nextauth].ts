import client from "@libs/server/client";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentailsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {NextApiRequest} from "next";

export default NextAuth({
    adapter: PrismaAdapter(client),
    providers: [
        CredentailsProvider({
            name: "Credentials",
            credentials: {
                id: {
                    label: "이메일",
                    type: "text",
                    placeholder: "아이디를 입력하세요.",
                },
                password: {
                    label: "비밀번호",
                    type: "password",
                    placeholder: "비밀번호를 입력하세요.",
                },
            },
            async authorize(
                credentials: Record<any, any>,
                req: NextApiRequest
            ) {
                console.log(credentials);
                return credentials;
                if (!credentials)
                    throw new Error(
                        "잘못된 입력값으로 인한 오류가 발생했습니다."
                    );

                const {id, password} = credentials;

                const exUser = await client.user.findUnique({
                    where: {id},
                });
                if (!exUser) throw new Error("존재하지 않는 아이디입니다.");

                const result = await bcrypt.compare(password, exUser.password);
                if (!result) throw new Error("비밀번호가 불일치합니다.");

                // 반환하는 값중에 name, email, image만 살려서 "session.user"로 들어감
                return exUser;
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            // "account.provider"는 로그인을 요청할 때만 값이 존재하기 때문에
            // 로그인 요청을 하는 경우에 체크해서 첫 로그인이라면 등록합니다.

            // 구글 로그인일 경우
            if (account?.provider === "google") {
                const exUser = await client.user.findFirst({
                    where: {provider: "GOOGLE", email: token.email!},
                });

                // 등록된 유저가 아니라면 회원가입
                if (!exUser) {
                    await client.user.create({
                        data: {
                            name: token.name!,
                            email: token.email!,
                            image: token.picture,
                            provider: "GOOGLE",
                        },
                    });
                }
            }

            return token;
        },
        // 세션에 로그인한 유저 데이터 입력
        async session({session}) {
            const exUser = await client.user.findFirst({
                where: {email: session.user.email},
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    provider: true,
                },
            });

            session.user = exUser!;

            return session;
        },
    },
    pages: {signIn: "/login"},
});
