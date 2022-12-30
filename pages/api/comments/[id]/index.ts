import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({req, secret});
    if (!token) res.status(403).json({message: "Not Login"});

    if (req.method === "POST") {
        const {
            body: {content},
            query: {id: postId},
        } = req;

        const newComment = await client.comment.create({
            data: {
                content,
                user: {
                    connect: {
                        id: token.uid,
                    },
                },
                post: {
                    connect: {
                        id: Number(postId),
                    },
                },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });

        res.json({ok: true, newComment});
    }

    if (req.method === "DELETE") {
        const {
            query: {id: commentId},
        } = req;

        const existComment = await client.comment.findUnique({
            where: {
                id: Number(commentId),
            },
        });

        if (existComment.userId !== token.uid) {
            res.status(403).json({message: "Not Matched User"});
        }

        await client.comment.delete({
            where: {
                id: Number(commentId),
            },
        });

        res.json({
            ok: true,
        });
    }
}

export default withHandler({methods: ["POST", "DELETE"], handler});
