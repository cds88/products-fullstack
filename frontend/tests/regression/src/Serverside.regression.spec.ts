import { test, expect } from "@playwright/test";
import * as fs from "fs";
import { PNG } from "pngjs";

test.describe("Products Serverside page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(`table`);
  });
  test("Should pixelmatch main screen", async ({
    page,
    browserName,
  }) => {
    const Pixelmatch = (await import("pixelmatch")).default;

    const screenshotPath = `screenshots/${browserName}-new-pixelmatch.png`;
    const baselineScreenshotPath = `screenshots/${browserName}-baseline-pixelmatch.png`;
    const diffSreenshotPath = `screenshots/${browserName}-diff-pixelmatch.png`;

    await page.screenshot({ path: screenshotPath });

    if (!fs.existsSync(baselineScreenshotPath)) {
      fs.copyFileSync(screenshotPath, baselineScreenshotPath);
    } else {
      const baselineImg = PNG.sync.read(
        fs.readFileSync(baselineScreenshotPath)
      );
      const newImg = PNG.sync.read(fs.readFileSync(screenshotPath));
      const { width, height } = baselineImg;
      const diff = new PNG({ width, height });
      const numDiffPixels = Pixelmatch(
        baselineImg.data,
        newImg.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
      );
      if (numDiffPixels > 0) {
        fs.writeFileSync(diffSreenshotPath, PNG.sync.write(diff));
        console.log(`Found difference in pixels`);
      }
      expect(numDiffPixels).toBe(0);
    }
  });
});
