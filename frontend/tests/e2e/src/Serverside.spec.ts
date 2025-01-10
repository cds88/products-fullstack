import { test, expect } from "@playwright/test";





test.describe("Products Serverside page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(`table`);
  });
  test("Shoud Include necessary base content", async ({ page }) => {
    expect(1).toBe(1);
    const header = await page.locator("header");

    await expect(header).toContainText(/Products Table/);
  });
});
