import type { NextApiRequest, NextApiResponse } from "next";
import { Link, PrismaClient } from "@prisma/client";
import { useSession, getSession } from "next-auth/react";
import { createShortLink, getUserByEmail } from "lib/db";
import { User } from "next-auth";

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
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const url = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 7);

  try {
    const email = session?.user?.email;
    let userDB: any;

    if (email) userDB = await getUserByEmail(email);

    console.log("user data", userDB);
    const data = await createShortLink(url, shortUrl, userDB.id);

    return res.status(200).json({ data });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}
