import { Prisma, PrismaClient } from "@prisma/client";

interface ShortLink {
  url: string;
  shortUrl: string;
  userId: number;
}

interface LinkData {
  id?: number;
  url?: string;
  shortUrl?: string;
  createdAt?: Date;
  userId?: number | null;
  User?: number;
}
// Link handlers
export const createShortLink = async (
  url: string,
  shortUrl: string,
  userId: number
): Promise<LinkData> => {
  const prisma = new PrismaClient();

  const linkData = await prisma.link.create({
    data: { url, shortUrl, userId } as ShortLink,
  });

  await prisma.user.update({
    where: { id: userId },
    data: {
      links: {
        connect: {
          id: linkData.id,
        },
      },
    },
  });

  await prisma.$disconnect();
  return linkData;
};

export const getURLbyShortLink = async (shortUrl: string) => {
  const prisma = new PrismaClient();
  const data = await prisma.link.findUnique({
    where: { shortUrl },
  });

  if (!data) return null;

  await prisma.$disconnect();
  return data;
};

/* export const updateShortLinkClicks = async (shortUrl: string, data: any) => {
  const prisma = new PrismaClient();
  const response = await prisma.link.update({
    where: { shortUrl },
    data: { clicks: data.clicks + 1 },
  });
  await prisma.$disconnect();
  return response;
}; */

// User handlers
export const getUserByEmail = async (email: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      links: true,
    },
  });
  await prisma.$disconnect();
  return user;
};

export const getRecentUrls = async (email: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      links: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
    },
  });
  await prisma.$disconnect();
  return user;
};

export const deleteLink = async (linkId: number) => {
  const prisma = new PrismaClient();
  try {
    const link = await prisma.link.findUnique({
      where: {
        id: linkId,
      },
    });
    if (!link) throw new Error("Link not found");

    console.log("ima link", link);
    await prisma.link.delete({
      where: {
        id: linkId,
      },
    });
    await prisma.$disconnect();
    return true;
  } catch (err) {
    console.error("error on delete", err);
    return false;
  }
};

export const createUser = async (email: string) => {
  const prisma = new PrismaClient();
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    // User already exists
    return;
  }

  await prisma.user.create({
    data: { email },
  });
  await prisma.$disconnect();
};
