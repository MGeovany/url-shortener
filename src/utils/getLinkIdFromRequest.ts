import { NextApiRequest } from "next";

export function getLinkIdFromRequest(req: NextApiRequest): number {
  const linkId = Number(req.query.linkId);
  if (isNaN(linkId)) {
    throw new Error("Invalid linkId");
  }
  return linkId;
}
