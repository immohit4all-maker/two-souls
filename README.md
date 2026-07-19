# Two Souls

A Next.js storefront app with Prisma and AWS-friendly deployment settings.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Low-cost AWS deployment plan

For a small storefront, the cheapest practical setup is:

- AWS Amplify Hosting for the frontend
- Amazon RDS for PostgreSQL for the Prisma database
- Amazon S3 only if you later need image uploads

### Recommended services

- Amplify Hosting: lowest-friction option for this Next.js app
- RDS PostgreSQL: use the free-tier eligible instance for early development
- S3: optional and very inexpensive for static media

### Deployment checklist

1. Create a PostgreSQL database in RDS.
2. Set the database URL in Amplify environment variables as DATABASE_URL.
3. Connect your GitHub repository to Amplify.
4. Use the existing Amplify build configuration in amplify.yml.
5. Optionally add S3 later for product images.

### Suggested environment variables

```env
DATABASE_URL=postgresql://postgres:password@your-rds-endpoint:5432/two_souls?schema=public
```

## Useful commands

```bash
npm run build
npm run lint
npx prisma generate
```
