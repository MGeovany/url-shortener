export default function getDomainNameFromUrl(urlString: string): string | null {
  try {
    const { hostname } = new URL(urlString);
    const domainName = hostname.replace(/^www\./, "");
    return domainName;
  } catch (error) {
    console.error(`Error parsing URL: ${urlString}`, error);
    return null;
  }
}
