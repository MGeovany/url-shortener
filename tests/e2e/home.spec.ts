import { test, expect } from "@playwright/test";

test.describe("Home Page Sanity Test", () => {
  test("should render the Home page with expected elements", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");

    // Verify that the main heading is rendered
    const mainHeading = await page.waitForSelector("h1");
    expect(await mainHeading.textContent()).toContain("zoro.cut");

    // Verify that the URL input field is present
    const urlInput = await page.waitForSelector('textarea[aria-label="Url"]');
    expect(urlInput).toBeTruthy();

    // Verify that the "New URL" button is present
    const newUrlButton = await page.waitForSelector('button[type="submit"]');
    expect(newUrlButton).toBeTruthy();

    const signInMessage = await page.textContent("body");
    expect(signInMessage).toContain("Sign In to see all your URLs!");

    await page.screenshot({ path: "homepage.png" });
  });
});

// test("should render first page", async ({ page }) => {
//   await page.goto("http://localhost:3000/");

//   await expect(page).toHaveURL("http://localhost:3000");
//   await expect(page.getByText("zoro.cut")).toBeVisible();
//   await expect(page.getByText("URL Shortener")).toBeVisible();
// });
