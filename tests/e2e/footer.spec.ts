import { test, expect } from "@playwright/test";

test.describe("Footer Component", () => {
  test("should render correctly with copyright information", async ({
    page,
  }) => {
    await page.goto("./");

    const footer = await page.waitForSelector("footer");

    expect(await footer.isVisible()).toBeTruthy();

    const footerText = await footer.textContent();

    expect(footerText).toContain("copyright");
    expect(footerText).toContain("2024");
    expect(footerText).toContain("zoro.cut");
  });
});
