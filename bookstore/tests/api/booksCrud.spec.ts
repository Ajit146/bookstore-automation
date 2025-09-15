import { test, expect } from '@playwright/test';
import { getHeaders, getBaseURL } from "../config/config";

test.describe('Books API CRUD', () => {
  let bookId: number;

  test('Create book', async ({ request }) => {
    const payload = {
      id: 23,
      name: 'Playwright Automation',
      author: 'Automation Tester',
      published_year: 2025,
      book_summary: 'A book about API automation using Playwright',
    };

    const response = await request.post(`${getBaseURL()}/books`, {
      data: payload,
      headers: getHeaders(),
    });

    expect([200, 201]).toContain(response.status());
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body).toMatchObject({
      name: payload.name,
      author: payload.author,
      published_year: payload.published_year,
      book_summary: payload.book_summary,
    });

    bookId = body.id;
    console.log(bookId)
  });

  test('Get all books', async ({ request }) => {
    const response = await request.get(`${getBaseURL()}/books`, { headers: getHeaders() });
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('Get book by ID', async ({ request }) => {
    if (!bookId) test.skip();
    const response = await request.get(`${getBaseURL()}/books/${bookId}`, { headers: getHeaders() });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', bookId);
  });

  test('Update book', async ({ request }) => {
    if (!bookId) test.skip();
    const payload = {
      name: 'Updated Playwright Book',
      author: 'Automation Tester',
      published_year: 2026,
      book_summary: 'Updated summary',
    };

    const response = await request.put(`${getBaseURL()}/books/${bookId}`, {
      data: payload,
      headers: getHeaders(),
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject(payload);
  });

  test('Delete book', async ({ request }) => {
    if (!bookId) test.skip();
    const response = await request.delete(`${getBaseURL()}/books/${bookId}`, { headers: getHeaders() });
    expect(response.status()).toBe(200);
  });
});