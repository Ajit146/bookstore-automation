// tests/api/books.spec.ts
import { test, expect } from "@playwright/test";
import { getHeaders, getBaseURL } from "../config/config";

test.describe("Books API CRUD", () => {
  let bookId: number;

  test("Create book", async ({ request }) => {
    const payload = {
      name: "Playwright Automation",
      author: "Automation Tester",
      published_year: 2025,
      book_summary: "A book about API automation using Playwright",
    };

    const response = await request.post(`${getBaseURL()}/books`, {
      data: payload,
      headers: getHeaders(),
    });

    expect([200, 201]).toContain(response.status());

    const body = await response.json();
    bookId = body.id;
    console.log(bookId)
  });
});