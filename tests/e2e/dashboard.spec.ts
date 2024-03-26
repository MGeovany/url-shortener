import { test, expect } from "@playwright/test";

test.describe("Dashboard Page", () => {
  test("should render the Home page with expected elements", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/dashboard");

    // Assert that the loading circle is not visible
    expect(await page.isVisible("div.LoadingCircle")).toBeFalsy();

    // Assert that the "Dashboard / Analytics" text is not visible
    expect(
      await page.isVisible('span.text-gray-500:has-text("Dashboard /")')
    ).toBeFalsy();

    // Assert Sign In to see all your URLs! is visible
    const signInMessage = await page.textContent("body");
    expect(signInMessage).toContain("Sign In to see all your URLs!");
  });
});
