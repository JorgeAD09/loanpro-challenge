import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const env = process.env.ENV || 'dev';

test.describe(`POST /${env}/users - Create user`, () => {

  test(`should create user successfully in ${env}`, async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/${env}/users`, {
      data: {
        name: 'Jorge Test',
        email: `jorge_${Date.now()}@test.com`,
        age: 30
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe('Jorge Test');
    expect(body.age).toBe(30);
  });

  test(`should return 400 when age is missing in ${env}`, async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/${env}/users`, {
      data: {
        name: 'Jorge Test',
        email: `jorge_${Date.now()}@test.com`
      }
    });

    expect(response.status()).toBe(400);
  });

  test(`should return 409 when email already exists in ${env}`, async () => {
    const context = await request.newContext();
    const email = `duplicate_${Date.now()}@test.com`;

    await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test', email, age: 30 }
    });

    const response = await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test 2', email, age: 30 }
    });

    expect(response.status()).toBe(409);
  });

});