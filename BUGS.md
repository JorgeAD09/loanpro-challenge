# Bug Report

## How bugs were found
Tests were initially run against both environments simultaneously using 
a loop, which revealed discrepancies between expected and actual behavior
in both dev and prod environments.

## Bug #1
**Endpoint** POST /users
**Endpoint** 409 when email already exists
**Received** 500 
**Environments** dev and prod

## Bug #2
**Endpoint:** GET /users/{email}
**Expected:** 404 when user doesn't exist
**Received:** 500
**Environments:** dev and prod

## Bug #3
**Endpoint:** DELETE /users/{email}
**Expected:** 401 when token is incorrect
**Received:** 204 user gets deleted anyway
**Environments:** dev only

## Bug #4
**Endpoint:** GET /users/{email} after DELETE
**Expected:** 404 when user was deleted
**Received:** 500
**Environments:** dev and prod
