import getDomainNameFromUrl from "@/utils/mainNameFromUrl";

describe("getDomainNameFromUrl function", () => {
  it("should return domain name without 'www.' prefix when given a valid URL", () => {
    const url = "https://www.example.com";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("example.com");
  });

  it("should return null when given an empty string", () => {
    const url = "";
    const result = getDomainNameFromUrl(url);
    expect(result).toBeNull();
  });

  it("should return null for URL without protocol", () => {
    const url = "www.example.com";
    const result = getDomainNameFromUrl(url);
    expect(result).toBeNull();
  });

  it("should return domain name without 'www.' prefix for URL with IP address", () => {
    const url = "https://192.168.0.1";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("192.168.0.1");
  });

  it("should return domain name without 'www.' prefix for URL with port number", () => {
    const url = "https://www.example.com:8080";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("example.com");
  });

  it("should return domain name without 'www.' prefix when given a URL with multiple subdomains", () => {
    const url = "https://www.subdomain.example.com";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("subdomain.example.com");
  });

  it("should return domain name without 'www.' prefix when given a URL with non-standard TLD", () => {
    const url = "https://www.example.xyz";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("example.xyz");
  });

  it('should return domain name without "www." prefix when given a URL with query parameters', () => {
    const url = "https://www.example.com?param1=value1&param2=value2";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("example.com");
  });

  it("should return domain name without 'www.' prefix when given a URL with fragment identifier", () => {
    const url = "https://www.example.com#fragment";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("example.com");
  });
});
