import { neon } from "@neondatabase/serverless";

export type Row = Record<string, unknown>;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

export const sql = neon(connectionString);

export async function queryRows<T extends Row>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]> {
  return sql(strings, ...values) as Promise<T[]>;
}
