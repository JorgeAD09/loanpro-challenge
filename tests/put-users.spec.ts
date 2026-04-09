import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const env = process.env.ENV || 'dev';

test.describe(`PUT /${env}/users/:email - Update user`, () => {

  test(`should update user successfully in ${env}`, async () => {
    const context = await request.newContext();
    const email = `putuser_${Date.now()}@test.com`;

    await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test', email, age: 30 }
    });

    const response = await context.put(`${BASE_URL}/${env}/users/${email}`, {
      data: { name: 'Jorge Updated', email, age: 99 }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Jorge Updated');
    expect(body.age).toBe(99);
  });

  test(`should return 400 when age is missing in ${env}`, async () => {
    const context = await request.newContext();
    const email = `putuser_${Date.now()}@test.com`;

    await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test', email, age: 30 }
    });

    const response = await context.put(`${BASE_URL}/${env}/users/${email}`, {
      data: { name: 'Jorge Updated', email }
    });

    expect(response.status()).toBe(400);
  });

  test(`should return 404 when user does not exist in ${env}`, async () => {
    const context = await request.newContext();
    const response = await context.put(`${BASE_URL}/${env}/users/notexist@test.com`, {
      data: { name: 'Jorge Test', email: 'notexist@test.com', age: 30 }
    });

    expect(response.status()).toBe(404);
  });

  test(`should return 409 when email already exists in ${env}`, async () => {
    const context = await request.newContext();
    const email = `duplicate_${Date.now()}@test.com`;
    const email2 = `duplicate2_${Date.now()}@test.com`;

    await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test', email, age: 30 }
    });

    await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test 2', email: email2, age: 30 }
    });

    const response = await context.put(`${BASE_URL}/${env}/users/${email}`, {
      data: { name: 'Jorge Test', email: email2, age: 30 }
    });

    expect(response.status()).toBe(409);
  });

});