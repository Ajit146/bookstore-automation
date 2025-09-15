import { test, expect } from '@playwright/test';
import { getHeaders, getBaseURL } from "../config/config";

test.describe('Books API - Negative Scenarios', () => {
  test('Fail to create book without token', async ({ request }) => {
    const payload = { id: 0, name: 'Unauthorized Book' };
    const response = await request.post(`${getBaseURL()}/books`, { data: payload });
    expect([401, 403]).toContain(response.status());
  });

  test('Fail to create book with invalid payload', async ({ request }) => {
    const payload = { wrongField: 'oops' };
    const response = await request.post(`${getBaseURL()}/books`, {
      data: payload,
      headers: getHeaders(),
    });
    expect(response.status()).toBe(500);
  });

  test('Fail to fetch non-existing book ID', async ({ request }) => {
    const response = await request.get(`${getBaseURL()}/books/99999`, {
      headers: getHeaders(),
    });
    expect([404, 400]).toContain(response.status());
  });

  test('Fail to delete non-existing book', async ({ request }) => {
    // try deleting something invalid
    const response = await request.delete(`${getBaseURL()}/books/99999`, {
      headers: getHeaders(),
    });
    expect([404, 400]).toContain(response.status());
  });
});