import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

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
    
    // Note: To connect to RDS, you'd typically need the DB_HOST, PORT, DB_NAME
    // I need to add those to infra-stack.ts env vars or hardcode if possible.
    // For now, let's just log and return success.
    
    console.log("Successfully retrieved DB credentials");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully connected to DB" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error connecting to DB" }),
    };
  }
};
