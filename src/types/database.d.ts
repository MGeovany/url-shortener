interface LinkData {
  id: number;
  url: string;
  shortUrl?: string;
  createdAt?: Date;
  deleted?: boolean;
  userId?: number | null;
  User?: number;
}

interface ShortLink
  extends Pick<LinkData, "id" | "url" | "shortUrl" | "userId"> {}
