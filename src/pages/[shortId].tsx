import React from "react";
import { PrismaClient } from "@prisma/client";

interface ShortIdPageProps {
  shortId: string;
}

const ShortIdPage: React.FC<ShortIdPageProps> = ({ shortId }) => {
  return (
    <div>
      <p>shortIdPage</p>
      <p>Short Id: {shortId}</p>
    </div>
  );
};
export default ShortIdPage;

/**
 * Retrieves the url stored on the database and returns a redirect destination.
 * @param params - Expects a `shortId` property.
 * @returns A redirect object with the destination set to either `"/"` or the `url` property of the retrieved data.
 */
export async function getServerSideProps({
  params,
}: {
  params: { shortId: string };
}): Promise<{ redirect: { destination: string } }> {
  try {
    const prisma = new PrismaClient();
    const { shortId } = params;

    const data = await prisma.link.findUnique({
      where: { shortUrl: shortId },
    });

    prisma.$disconnect();

    if (!data) {
      return {
        redirect: { destination: "/" },
      };
    }

    return {
      redirect: {
        destination: data.url,
      },
    };
  } catch (error) {
    console.error("Error fetching data from the short url:", error);
    return {
      redirect: { destination: "/" },
    };
  }
}
