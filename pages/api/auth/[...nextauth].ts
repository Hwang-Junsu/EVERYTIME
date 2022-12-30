import * as bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import client from "@libs/server/client";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "email-password-credential",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "test@test.com",
                },
                password: {label: "Password", type: "password"},
            },

            // typescript bug
            async authorize(credentials) {
                const user = await client.user.findUnique({
                    where: {email: credentials?.email},
                    select: {name: true, email: true, password: true},
                });
                const matchedPassword = await bcrypt.compare(
                    credentials?.password as string,
                    user?.password as string
                );
                if (!matchedPassword) {
                    throw new Error("Password Incorrect");
                }
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        jwt: async ({user, token}) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(client),
    pages: {signIn: "/login"},
    session: {strategy: "jwt"},
});
