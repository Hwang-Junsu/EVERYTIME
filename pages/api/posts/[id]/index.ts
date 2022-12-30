import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({req, secret});
    if (!token) res.status(403).json({message: "Not Login"});
    const post = await client.post.findUnique({
        where: {
            id: Number(req.query.id),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            comments: true,
            _count: {
                select: {
                    comments: true,
                    likes: true,
                },
            },
        },
    });

    res.json({
        ok: true,
        post,
    });
}

export default withHandler({methods: ["GET"], handler});
