# loanpro-challenge

E2E test suite for the User Management API

## Tech Stack
- Playwright
- TypeScript
- GitHub Actions

## Prerequisites
- Node.js 20+
- Docker

## Run the app locally
```bash
docker run -p 3000:3000 ghcr.io/danielsilva-loanpro/sdet-interview-challenge:latest
```

## Run the tests locally
```bash
npm ci
npx playwright install --with-deps chromium
npx playwright test
```

## Run against a specific environment
```bash
# Dev
ENV=dev npx playwright test

# Prod (PowerShell)
$env:ENV="prod"; npx playwright test
```

## CI Pipeline
The GitHub Actions pipeline runs test against both environments in parallel
- `E2E Tests - Dev` - runs tests against the dev environment
- `E2E Tests - Prod` - runs tests against the prod environment

## Bugs Found
See [BUGS.md](./BUGS.md) for a full list of bugs discovered during testing