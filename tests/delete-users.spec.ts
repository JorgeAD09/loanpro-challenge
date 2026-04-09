import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const env = process.env.ENV || 'dev';

test.describe(`DELETE /${env}/users/:email - Delete user`, () => {

  test(`should return 204 when deleting user successfully in ${env}`, async () => {
    const context = await request.newContext();
    const email = `deleteuser_${Date.now()}@test.com`;

    await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test', email, age: 30 }
    });

    const response = await context.delete(`${BASE_URL}/${env}/users/${email}`, {
      headers: { 'Authentication': 'mysecrettoken' }
    });

    expect(response.status()).toBe(204);

    const getResponse = await context.get(`${BASE_URL}/${env}/users/${email}`);
    expect(getResponse.status()).toBe(404);
  });

  test(`should return 401 when unauthorized in ${env}`, async () => {
    const context = await request.newContext();
    const email = `unauthorized_${Date.now()}@test.com`;

    await context.post(`${BASE_URL}/${env}/users`, {
      data: { name: 'Jorge Test', email, age: 30 }
    });

    const response = await context.delete(`${BASE_URL}/${env}/users/${email}`, {
      headers: { 'Authentication': 'tokenincorrecto' }
    });

    expect(response.status()).toBe(401);
  });

  test(`should return 404 when user does not exist in ${env}`, async () => {
    const context = await request.newContext();

    const response = await context.delete(`${BASE_URL}/${env}/users/notexist@example.com`, {
      headers: { 'Authentication': 'mysecrettoken' }
    });

    expect(response.status()).toBe(404);
  });

});