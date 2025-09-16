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

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
