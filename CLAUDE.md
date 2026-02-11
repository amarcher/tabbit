# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Tabbit?

A full-stack bill-splitting app for restaurants. Users create tabs, add items with prices, assign items to people ("rabbits"), and split costs. Supports OCR receipt scanning via Google Cloud Vision and Venmo payments.

## Development Commands

```bash
# Install dependencies
bundle install
cd client && npm install && cd ..

# Database setup
rake db:create && rake db:migrate

# Start dev server (Rails API on :3001, React on :3000 via foreman)
rake start

# Run backend tests (RSpec)
bundle exec rspec
bundle exec rspec spec/models/tab_spec.rb   # single test file

# Lint frontend
npm --prefix client run lint
npm --prefix client run lint-fix

# Build frontend
npm --prefix client run build
```

## Architecture

**Backend**: Rails 5 API-only app (Ruby 2.4.0, PostgreSQL)
**Frontend**: React 15 SPA in `client/` with Redux + Redux-Saga

### API Structure

All API endpoints are namespaced under `/api/v1/`. Routes defined in `config/routes.rb`. Controllers live in `app/controllers/api/v1/`. Auth is token-based via `ApplicationController`.

Key resources: tabs (with nested items, rabbits, image OCR), rabbits, users, sessions.

### Frontend Data Flow

Redux actions → Redux-Saga (`client/src/sagas/index.js`) → API calls via `client/src/ajax.js` → Reducers update store.

Sagas use a `*_REQUESTED` / `*_SUCCEEDED` / `*_FAILED` action naming convention.

Reducers: `authorizationReducer`, `userReducer`, `tabReducer`, `rabbitReducer`, `errorsReducer`.

### Domain Models

- **User** — has many tabs, authenticates via bcrypt
- **Tab** — belongs to user, has many items, has and belongs to many rabbits (HABTM)
- **Item** — belongs to tab, can be tagged with rabbits for cost splitting
- **Rabbit** — a person on a tab (HABTM with tabs); can be charged via Venmo

### Key Integrations

- **Google Cloud Vision**: OCR for receipt images (`tabs#analyze_image`), requires `GOOGLE_CLOUD_PROJECT` env var
- **Venmo**: OAuth flow + charge API (`venmo_controller.rb`, `rabbits#charge_rabbit`)

## Code Style

Frontend uses **tabs for indentation** (not spaces), enforced by ESLint with Airbnb config. Max line length is 120 characters. JSX in `.js` files is allowed.
