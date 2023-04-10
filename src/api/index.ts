import { FAILED_TO_DELETE_TOAST } from "@/notifications";

export async function deleteLink(id: number): Promise<boolean> {
  const response = await fetch(`/api/deleteLink?linkId=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    FAILED_TO_DELETE_TOAST(response.statusText);
    return false;
  }
  return true;
}

export async function createShortLink(url: string) {
  const response = await fetch("/api/shortUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(url),
  });

  if (!response.ok) {
    throw new Error(`Failed to create short link: ${response.statusText}`);
  }

  return response.json();
}
