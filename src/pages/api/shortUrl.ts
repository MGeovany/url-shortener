import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { createShortLink, createTemporaryLink, getUserByEmail } from "lib/db";
import { authOptions } from "./auth/[...nextauth]";
import { generateShortUrl } from "@/utils/generateShortUrl";

type Data = {
  url?: string;
  shortUrl?: string;
  error?: string;
  data?: unknown;
};

/**
 * Handles an HTTP request and creates a short URL based on the request data.
 * If the user is authenticated, it associates the short URL with the user's account.
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @returns JSON response with status code 202 if the user is not authenticated.
 * JSON response with status code 200 if the user is authenticated and the short link is created successfully.
 * JSON response with status code 500 if any errors occur during the process.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const url = req.body;
    const shortUrl = generateShortUrl();

    if (!session) {
      const data = await createTemporaryLink(url, shortUrl);
      return res.status(202).json(data);
    }
    const email = session?.user?.email;
    if (!email) throw new Error("User email not found in session.");

    const userDB = await getUserByEmail(email);
    if (!userDB) throw new Error("User data not found.");

    const data = await createShortLink(url, shortUrl, userDB.id);

    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Error on short url:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
