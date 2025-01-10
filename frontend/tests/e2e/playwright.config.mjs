import { defineConfig } from '@playwright/test';

const browsersCommonConfig = {
  baseURL: `http://products-frontend:3000`,

  headless: true,  
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  deviceScaleFactor: 1,
  viewport: {
    height: 720,
    width: 1280,
  },  
}

const chromiumConfig = { browserName: 'chromium', ...browsersCommonConfig };
const firefoxConig = { browserName: 'firefox', ...browsersCommonConfig };
const webkitConfig = { browserName: 'webkit', ...browsersCommonConfig };

export default defineConfig({
  testDir: './src/',
  timeout: 30000,
  retries: 2,
  use: {
    browserName: 'chromium',
    outputDir: "./test-results",
    ...browsersCommonConfig
  },

  projects: [
    { name: 'Chromium', use: chromiumConfig },
    { name: 'Firefox', use: firefoxConig },
    { name: 'Webkit', use: webkitConfig },
  ],
});
