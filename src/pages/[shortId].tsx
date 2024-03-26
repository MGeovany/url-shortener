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

export async function getServerSideProps({ params }: { params: any }) {
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
