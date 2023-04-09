import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { createShortLink, createTemporaryLink, getUserByEmail } from "lib/db";

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
  const session = await getSession({ req });
  const url = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 7);

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
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}
