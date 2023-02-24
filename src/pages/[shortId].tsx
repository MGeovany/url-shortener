import React from "react";
import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";

interface Props {
  shortId: string;
}

const ShortIdPage: React.FC<Props> = ({ shortId }) => {
  return (
    <div>
      <p>shortIdPage</p>
      <p>Short Id: {shortId}</p>
    </div>
  );
};
export default ShortIdPage;

export async function getServerSideProps({ params }: { params: any }) {
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
}
