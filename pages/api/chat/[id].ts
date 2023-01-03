import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/chat";
import client from "@libs/server/client";
import { getToken } from "next-auth/jwt";
import withHandler from "@libs/server/withHandler";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  const token = await getToken({ req, secret });
  if (!token) res.status(403).json({ message: "Not Login" });
  // *Save Chat Content ✅
  if (req.method === "POST") {
    const { body } = req;

    const currentUser = await client.user.findUnique({
      where: {
        id: String(token.uid),
      },
    });

    const newMessage = await client.message.create({
      data: {
        message: body.msg,
        timeStamp: body.timeStamp,
        image:
          body.image ||
          "https://imagedelivery.net/_svxocQ2IUnWarpkNEZZ5A/c257d6a5-e5ef-4031-068a-7c3bd9fd8100/avatar",
        userName: currentUser.name,
        author: {
          connect: {
            id: String(token.uid),
          },
        },
        chatroom: {
          connect: {
            id: Number(req.query.id),
          },
        },
      },
    });

    return res.json({ ok: true, newMessage });
  }

  // * Messages Backup ✅
  if (req.method === "GET") {
    // const chatroomMessages = await client.message.findMany({
    //   where: {
    //     chatroom: {
    //       id: Number(req.query.id),
    //     },
    //   },
    // });

    const chatroom = await client.chatRoom.findUnique({
      where: {
        id: Number(req.query.id),
      },
      select: {
        members: true,
        message: true,
      },
    });

    res.json({ ok: true, chatroom });
  }
}

export default withHandler({ methods: ["GET", "POST"], handler });
