import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Data = {
  url: string;
  shortUrl: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { url } = req.body;
  const shortUrl = Math.random().toString(36).substring(2, 5);

  try {
    const data = await prisma.link.create({
      data: { url, shortUrl },
    });
    return res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
};
