import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test("should render the Home page with expected elements", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/dashboard");

    const signInMessage = page.getByText("Sign In to see all your URLs!");

    expect(signInMessage).toBeVisible();

    await page.screenshot({ path: "screenshot.png", fullPage: true });
  });
});
