import {NextApiRequest} from "next";
import {NextApiResponseServerIO} from "../../../types/chat";
import client from "@libs/server/client";
import {getToken} from "next-auth/jwt";
import withHandler from "@libs/server/withHandler";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
    const token = await getToken({req, secret});
    if (!token) res.status(403).json({message: "Not Login"});
    // *Save Chat Content ✅
    if (req.method === "PATCH") {
        return res.status(201);
    }

    // * getChatAPI ✅
    if (req.method === "GET") {
        const chatroomMessages = await client.message.findMany({
            where: {
                chatroom: {
                    id: Number(req.query.id),
                },
            },
        });

        const chatroom = await client.chatRoom.findUnique({
            where: {
                id: Number(req.query.id),
            },
            select: {
                members: true,
                message: {
                    skip: chatroomMessages.length - 20,
                    take: 20,
                },
            },
        });

        res.json({ok: true, chatroom});
    }
}

export default withHandler({methods: ["GET", "PATCH"], handler});
