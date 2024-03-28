import type { NextApiRequest, NextApiResponse } from "next";
import { deleteLink } from "lib/db";
import { getLinkIdFromRequest } from "@/utils/getLinkIdFromRequest";

/**
 * Request handler for DELETE requests.
 * Deletes a link with the specified ID.
 * @param req The request object containing information about the incoming HTTP request.
 * @param res The response object used to send the HTTP response.
 * @returns A 204 status code with no content if the deletion is successful.
 *          A 500 status code with an "Internal Server Error" message if an error occurs.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "DELETE") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const linkId = getLinkIdFromRequest(req);
    await deleteLink(linkId);

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
