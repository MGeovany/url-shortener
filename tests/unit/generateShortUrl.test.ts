import { generateShortUrl } from "@/utils/generateShortUrl";

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
