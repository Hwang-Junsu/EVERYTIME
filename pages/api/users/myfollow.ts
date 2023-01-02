import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  if (!token) res.status(403).json({ message: "Not Login" });

  const receiveFollow = await client.user.findMany({
    where: {
      receiveFollow: {},
    },
  });
  const sendFollow = await client.user.findMany({});
  return res.json({ data: [] });
}

export default withHandler({ methods: ["GET"], handler });
