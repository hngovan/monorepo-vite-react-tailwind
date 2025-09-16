## About

### Stack overview

Below is an overview of all the components in the stack:

```
apps
  ├─ web
  |   ├─ react (vite)
  |   ├─ tanstack (router, query, form)
  |   └─ tailwindcss
  ├─ server
  |   └─ hono (wrapper for api & auth)
packages
  ├─ api
  |   └─ orpc with valibot
  ├─ auth
  |   └─ better-auth
  ├─ db
  |   └─ drizzle-orm (postgres database)
  ├─ ui
  |   ├─ tailwindcss
  |   └─ shadcn & radix ui
  └─ utils
      └─ shared utils (e.g. date formatting)
tools
  ├─ eslint-config
  ├─ prettier-config
  ├─ tailwind-config
  └─ typescript-config
```

## Base Functionalities

The following features are implemented out-of-the-box:

- login/register (using [better-auth email/password](https://www.better-auth.com/docs/authentication/email-password)) credentials provider
- themes (dark/light mode using [next-themes](github.com/pacocoursey/next-themes))
- web/server integration ([orpc](https://orpc.unnoq.com/docs/getting-started) API example for creating/listing posts)

## Quick Start

### Prerequisites

Ensure the following tools are available on your system:

1. [node](https://nodejs.org/en/download) (version 22+)
1. [bun](https://bun.com) (version 1+)
1. [postgres](https://www.postgresql.org) database, which you can easily run using tools like:
   - [docker](https://docs.docker.com/engine/install) and [docker-compose](https://docs.docker.com/compose)
   - [podman](https://podman.io/docs/installation) and [podman-compose](https://github.com/containers/podman-compose)
   - [supabase](https://supabase.com)'s free tier cloud database

# Setup

```bash
# Install all dependencies for apps and packages
pnpm install

# Copy .env.example to .env for all applications and the @repo/db package
pnpm env:copy-example

# Push the drizzle schema to your database
pnpm db:push
```

You can then start all applications with

```bash
bun dev
```

By default the following URLs will be accessible:

- Web (frontend): http://localhost:8085
- Server (backend): http://localhost:3035
  - API - OpenAPI reference: http://localhost:3035/api
  - Auth - OpenAPI reference: http://localhost:3035/api/auth/reference

The [OpenAPI](https://www.openapis.org) reference uses [Scalar](https://github.com/scalar/scalar) to display all available endpoints.

## Development

### Working with a single package

Use [`bun  --filter=<name>`](https://bun.com/docs/cli/filter) (where `<name>` is
defined in the `package.json` of each package).

Example usage:

```bash
# Install the nuqs package for our web application:
bun --filter=web install nuqs

# Format only the ui package:
bun --filter=@inu/ui format
```

You can get a list of all package names using the command below:

```bash
bun list --depth -1 --recursive
```

### Adding new shadcn components

To install a single Shadcn/UI component, e.g. `button`, use the command

```bash
bun ui-add button
```

- press `i` to enter interactive mode on startup
- use `j/k` (or arrow keys) to navigate up and down.
- use `<Space>` to toggle select your desired component(s)
- hit `<Enter>` to install all selected components

### Tooling Scripts

All scripts are defined in [package.json](package.json) and
[turbo.json](turbo.json):

```bash
bun clean                  # remove all .cache, .turbo, dist, node_modules

bun typecheck              # report typescript issues

bun format                 # report prettier issues
bun format:fix             # auto-fix prettier issues

bun lint                   # report eslint issues
bun lint:fix               # auto-fix eslint issues
```
