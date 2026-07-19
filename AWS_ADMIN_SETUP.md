# Two Souls admin: AWS production blueprint

The new `/admin` route is the operations workspace. Its current in-browser data makes the interface usable immediately; connect the resources below before using it for live orders.

## Recommended architecture

| Need | AWS service | Purpose |
| --- | --- | --- |
| Web hosting and deployments | AWS Amplify Hosting | The existing `amplify.yml` already builds this Next.js app. Connect your Git repository and deploy the main branch. |
| Admin authentication | Amazon Cognito | Create an `Administrators` group and only allow that group to reach `/admin` and admin APIs. |
| Commerce database | Amazon RDS PostgreSQL or Aurora PostgreSQL | The Prisma models in `prisma/schema.prisma` hold products, sellers, customers, orders and line items. |
| Product imagery | Amazon S3 + CloudFront | Keep the `imageKey` in Postgres; issue short-lived upload URLs from a protected server route. |
| Order events | Amazon EventBridge + Lambda | Publish events such as `order.created`, `order.shipped` and `inventory.low` for emails, fulfilment and audit logging. |
| Secrets | AWS Secrets Manager | Store `DATABASE_URL` and server-side AWS credentials; never commit them or expose them as `NEXT_PUBLIC_*`. |

## First deployment

1. Copy `.env.example` to `.env.local` and add your RDS connection string.
2. Create the database schema with `npx prisma migrate dev --name commerce_admin` locally, then use `npx prisma migrate deploy` in your CI/CD build.
3. Create an S3 bucket with public access blocked and a CloudFront distribution in front of it. Configure CORS only for your site domain.
4. Create a Cognito user pool and an `Administrators` group. Add the three public Cognito identifiers from `.env.example`; the server verifies group membership before returning admin data.
5. In Amplify, set the same environment variables and link the repository. The supplied `amplify.yml` runs `npm ci` and `npm run build`.

## Security rules to keep

- Do not read database credentials, S3 keys or order data in client components.
- Use IAM roles with least privilege: the application role needs only the product-assets bucket and the secret it consumes.
- Enforce admin authorization in every `/api/admin/*` route, not only at the admin page.
- Enable RDS backups, CloudTrail and CloudWatch alarms for failed authentication and Lambda failures.

The next implementation step is to replace each dashboard action with protected `/api/admin/products`, `/api/admin/orders` and `/api/admin/sellers` endpoints backed by the Prisma models.
