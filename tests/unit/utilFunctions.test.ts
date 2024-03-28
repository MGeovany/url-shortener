import { generateShortUrl } from "@/utils/generateShortUrl";
import getDomainNameFromUrl from "@/utils/mainNameFromUrl";

describe("getDomainNameFromUrl function", () => {
  it("should return domain name without 'www.' prefix when given a valid URL", () => {
    const url = "https://www.example.com";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("example.com");
  });

  it("should return null for URL without protocol", () => {
    const url = "www.example.com";
    const result = getDomainNameFromUrl(url);
    expect(result).toBe("example.com");
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

describe("generateShortUrl function", () => {
  it("should return a string of length 5", () => {
    const result = generateShortUrl();
    expect(result.length).toBe(5);
  });

  it("should return an empty string when Math.random() is mocked to always return 0", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    const result = generateShortUrl();
    expect(result).toBe("");
    jest.restoreAllMocks();
  });

  it("should return a string containing only alphanumeric characters", () => {
    const result = generateShortUrl();
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    expect(alphanumericRegex.test(result)).toBe(true);
  });

  it("should return a unique string on each call", () => {
    const result1 = generateShortUrl();
    const result2 = generateShortUrl();
    expect(result1).not.toBe(result2);
  });
});
