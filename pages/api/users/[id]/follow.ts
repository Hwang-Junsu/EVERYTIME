import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import {NextApiRequest, NextApiResponse} from "next";
import {getToken} from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({req, secret});
    if (!token) res.status(403).json({message: "Not Login"});
    const alreadyExists = await client.follow.findFirst({
        where: {
            receiveUserId: req.query.id as string,
            sendUserId: token.uid,
        },
    });

    if (alreadyExists) {
        await client.follow.delete({
            where: {
                id: alreadyExists.id,
            },
        });
    } else {
        await client.follow.create({
            data: {
                sendUser: {
                    connect: {
                        id: token.uid,
                    },
                },
                receiveUser: {
                    connect: {
                        id: req.query.id as string,
                    },
                },
            },
        });
    }
    res.json({
        ok: true,
    });
}

export default withHandler({methods: ["POST"], handler});
