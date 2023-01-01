import {NextApiRequest} from "next";
import {NextApiResponseServerIO} from "../../../types/chat";
import client from "@libs/server/client";
import {getToken} from "next-auth/jwt";
import withHandler from "@libs/server/withHandler";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    const token = await getToken({req, secret});
    if (!token) res.status(403).json({message: "Not Login"});
    // * createChatRoomAPI ✅
    if (req.method === "POST") {
        const {body} = req;
        const currentUser = await client.user.findUnique({
            where: {
                id: token.uid,
            },
        });
        const newChatRoom = await client.chatRoom.create({
            data: {
                members: {
                    create: [
                        {
                            user: {
                                connect: {
                                    id: currentUser.id,
                                },
                            },
                        },
                        {
                            user: {
                                connect: {
                                    id: body.userId,
                                },
                            },
                        },
                    ],
                },
            },
        });

        return res.status(201).send(newChatRoom);
    }

    // * getChatListAPI ✅
    if (req.method === "GET") {
        const chatrooms = await client.chattingOnUser.findMany({
            where: {
                userId: token.uid,
            },
            select: {
                chatroom: {
                    include: {
                        members: {
                            select: {
                                user: {
                                    select: {
                                        id: true,
                                        image: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                        message: true,
                    },
                },
            },
        });

        res.json({
            ok: true,
            chatrooms: chatrooms,
        });
    }
}

export default withHandler({methods: ["GET", "POST"], handler});
