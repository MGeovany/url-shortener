export default function getDomainNameFromUrl(urlString: string): string | null {
  try {
    if (!urlString) {
      console.error("URL string is empty");
      return null;
    }

    const prefixedUrl = urlString.includes("://")
      ? urlString
      : `http://${urlString}`;
    const { hostname } = new URL(prefixedUrl);
    const domainName = hostname.replace(/^www\./, "");
    return domainName;
  } catch (error) {
    console.error(`Error parsing URL: ${urlString}`, error);
    return null;
  }
}
