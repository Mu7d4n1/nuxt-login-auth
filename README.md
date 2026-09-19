# Nuxt Login Authentication

Simple authentication application built using:

- Nuxt 4
- TypeScript
- H3 Session
- Nuxt UI
- Tailwind CSS
- Yup
- Zod

## Features

### Authentication

Two demo users are available:

| Username | Password | Role |
|----------|----------|------|
| admin | admin | admin |
| employee | employee | employee |

### Authorization

Admin:

- Can access `/home`
- Can access `/admin`

Employee:

- Can access `/home`
- Cannot access `/admin`

Unauthenticated users:

- Cannot access `/home`
- Cannot access `/admin`
- Redirected to `/login`

## Validation

Client:

Yup

Server:

Zod

## Session

Authentication uses H3 Session with an HTTP-only cookie.

## Installation


npm install

##author
Dendy Murdani 