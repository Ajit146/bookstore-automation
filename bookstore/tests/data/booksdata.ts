export const createBookPayload = {
  id: Math.floor(Math.random() * 100000), // generates random ID
  name: 'Playwright Automation',
  author: 'Automation Tester',
  published_year: 2025,
  book_summary: 'A book about API automation using Playwright',
};

export const updateBookPayload = {
  name: 'Updated Playwright Book',
  author: 'Automation Tester',
  published_year: 2026,
  book_summary: 'Updated summary',
};