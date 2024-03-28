import { getLinkIdFromRequest } from "@/utils/getLinkIdFromRequest";

describe("getLinkIdFromRequest function", () => {
  it("should return a number when given a valid linkId in the request query", () => {
    const req = {
      query: {
        linkId: "123",
      },
    } as any;
    const result = getLinkIdFromRequest(req);
    expect(result).toBe(123);
  });

  it("should throw an error when linkId is not present in the request query", () => {
    const req = {
      query: {},
    } as any;
    expect(() => {
      getLinkIdFromRequest(req);
    }).toThrowError("Invalid linkId");
  });

  it("should throw an error when given an invalid linkId in the request query", () => {
    const req = {
      query: {
        linkId: "invalid",
      },
    } as any;
    expect(() => getLinkIdFromRequest(req)).toThrowError("Invalid linkId");
  });

  it("should throw an error when linkId is not a number in the request query", () => {
    const req = {
      query: {
        linkId: "abc",
      },
    } as any;
    expect(() => getLinkIdFromRequest(req)).toThrowError("Invalid linkId");
  });

  it("should return the correct number when given a large linkId in the request query", () => {
    const req = {
      query: {
        linkId:
          "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
      },
    } as any;
    const result = getLinkIdFromRequest(req);
    expect(result).toBe(
      999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    );
  });
});
