import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const env = process.env.ENV || 'dev';

test.describe(`GET /${env}/users - List all users`, () => {

  test(`should return 200 and an array in ${env} environment`, async () => {
    const context = await request.newContext();
    const response = await context.get(`${BASE_URL}/${env}/users`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

});