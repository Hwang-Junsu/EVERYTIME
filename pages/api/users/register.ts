import bcrypt from "bcrypt";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email, name, password },
  } = req;

  const existEmail = Boolean(
    await client.user.findUnique({ where: { email } })
  );

  console.log(existEmail);

  if (existEmail) {
    return res.status(403).end();
  }
  const originalHash =
    "$2a$10$7h/0SQ4FXRG5eX3602o3/.aO.RYkxKuhGkzvIXHLUiMJlFt1P.6Pe";

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

export default withHandler({ methods: ["POST"], handler });
