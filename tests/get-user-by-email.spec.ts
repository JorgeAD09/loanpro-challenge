import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const env = process.env.ENV || 'dev';

test.describe(`GET /${env}/users/:email - Get user by email`, () => {

  test(`should return 200 when user exists in ${env}`, async () => {
    const context = await request.newContext();
    const email = `getuser_${Date.now()}@test.com`;

    await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test', email, age: 25 }
    });

    const response = await context.get(`${BASE_URL}/${env}/users/${email}`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.email).toBe(email);
    expect(body.name).toBe('Jorge Test');
    expect(body.age).toBe(25);
  });

  test(`should return 404 when user does not exist in ${env}`, async () => {
    const context = await request.newContext();
    const response = await context.get(`${BASE_URL}/${env}/users/notexist@test.com`);

    expect(response.status()).toBe(404);
  });

});