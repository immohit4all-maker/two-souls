import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { products, sellers, orders } from "../../lib/schema"; // Import schemas
import { v4 as uuidv4 } from "uuid";

const secretsClient = new SecretsManagerClient({});

async function getDbConfig() {
  const secretArn = process.env.DB_SECRET_ARN;
  if (!secretArn) throw new Error("DB_SECRET_ARN is not set");

  const command = new GetSecretValueCommand({ SecretId: secretArn });
  const response = await secretsClient.send(command);
  
  if (!response.SecretString) throw new Error("Secret string not found");
  return JSON.parse(response.SecretString);
}

export const handler = async (event: any) => {
  try {
    const config = await getDbConfig();
    const connectionString = `postgres://${config.username}:${config.password}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    const sql = postgres(connectionString);
    const db = drizzle(sql);

    const path = event.path || '/'; // Assuming path is available in event
    const method = event.httpMethod;

    if (method === 'POST') {
      const body = JSON.parse(event.body);

      // Handle Add Product
      if (path === '/products') {
        if (!body.name || !body.sku || !body.category || !body.price || !body.sellerId) {
          return { statusCode: 400, body: JSON.stringify({ message: "Missing product fields" }) };
        }
        const newProduct = await db.insert(products).values({
          id: uuidv4(),
          sku: body.sku,
          name: body.name,
          description: body.description || null,
          category: body.category,
          price: body.price.toString(),
          compareAt: null,
          inventory: body.inventory || 0,
          sellerId: body.sellerId,
          status: 'DRAFT'
        }).returning();
        return { statusCode: 201, body: JSON.stringify({ message: "Product created", product: newProduct }) };
      }

      // Handle Add Seller
      if (path === '/sellers') {
        if (!body.name || !body.email || !body.contactName) {
          return { statusCode: 400, body: JSON.stringify({ message: "Missing seller fields" }) };
        }
        const newSeller = await db.insert(sellers).values({
          id: uuidv4(),
          name: body.name,
          contactName: body.contactName,
          email: body.email,
          phone: body.phone || null,
          status: 'PENDING',
          rating: '0'
          }).returning();
        return { statusCode: 201, body: JSON.stringify({ message: "Seller created", seller: newSeller }) };
      }
      
      // Handle Add Order
      if (path === '/orders') {
        if (!body.orderNumber || !body.customerId || !body.subtotal || !body.total) {
          return { statusCode: 400, body: JSON.stringify({ message: "Missing order fields" }) };
        }
        const newOrder = await db.insert(orders).values({
          id: uuidv4(),
          orderNumber: body.orderNumber,
          customerId: body.customerId,
          status: 'PENDING',
          subtotal: body.subtotal.toString(),
          shippingAmount: body.shippingAmount ? body.shippingAmount.toString() : '0',
          total: body.total.toString(),
          shippingAddress: body.shippingAddress || null,
          trackingNumber: null
        }).returning();
        return { statusCode: 201, body: JSON.stringify({ message: "Order created", order: newOrder }) };
      }
    }

    return { statusCode: 404, body: JSON.stringify({ message: "Endpoint not found" }) };
  } catch (error) {
    console.error("Full Error Details:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error processing request", error: error instanceof Error ? error.message : String(error) }),
    };
  }
};
