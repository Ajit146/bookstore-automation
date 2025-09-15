import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './bookstore/tests/api',
  fullyParallel: true,
  timeout: 30000,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    baseURL: process.env.API_BASE_URL || 'http://127.0.0.1:8000',
    extraHTTPHeaders: { 'Content-Type': 'application/json' },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'API',
      testMatch: /.*\.spec\.ts/
    }
  ]
});