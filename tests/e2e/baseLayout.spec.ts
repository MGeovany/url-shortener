import { test, expect } from "@playwright/test";

test.describe("BaseLayout Component", () => {
  test("should render correctly", async ({ page }) => {
    await page.goto("./");

    expect(await page.title()).toBe("zoro.cut | URL Shortener");

    expect(await page.isVisible("footer")).toBeTruthy();

    expect(await page.isVisible("main")).toBeTruthy();

    expect(await page.isVisible("main img")).toBeTruthy();
  });
});
