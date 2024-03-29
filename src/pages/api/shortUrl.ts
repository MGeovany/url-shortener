import type { NextApiRequest, NextApiResponse } from "next";
import { createShortLink, createTemporaryLink, getUserByEmail } from "lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type Data = {
  url?: string;
  shortUrl?: string;
  error?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);
  const url = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 7);

  console.log(session, "ses");
  if (!session) {
    const data = await createTemporaryLink(url, shortUrl);
    return res.status(202).json(data);
  }

  try {
    const email = session?.user?.email;
    let userDB: any;

    if (email) userDB = await getUserByEmail(email);

    const data = await createShortLink(url, shortUrl, userDB.id);

    return res.status(200).json(data);
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
}
