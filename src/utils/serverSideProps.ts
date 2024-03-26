import { getAllUrls } from "lib/db";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSidePropsUtil(
  context: GetServerSidePropsContext
) {
  const session = await getSession(context);

  const email = session?.user?.email;
  let response: any;
  if (email) response = await getAllUrls(email);

  return {
    props: {
      links: response ? JSON.parse(JSON.stringify(response.links)) : [],
      userSession: session,
    },
  };
}
