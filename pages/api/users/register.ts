import bcrypt from "bcrypt";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import {NextApiRequest, NextApiResponse} from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        body: {email, name, password, passwordCheck},
    } = req;

    const existEmail = Boolean(await client.user.findUnique({where: {email}}));

    if (existEmail) {
        return res.status(409).end();
    }
    if (password !== passwordCheck) {
        return res.status(400).end();
    }
    const originalHash = process.env.ORIGINAL_HASH;

    const hashedPassowrd = await bcrypt.hash(password, originalHash);
    await client.user.create({
        data: {
            name,
            email,
            password: hashedPassowrd,
        },
    });

    return res.json({
        ok: true,
    });
}

export default withHandler({methods: ["POST"], handler});
