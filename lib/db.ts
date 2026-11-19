import postgres from "postgres";

export type Row = Record<string, unknown>;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const requiresSsl = connectionString.includes("sslmode=require");

declare global {
  var _sql: ReturnType<typeof postgres> | undefined;
}

export const sql =
  globalThis._sql ||
  postgres(connectionString, {
    ssl: requiresSsl ? "require" : false,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._sql = sql;
}

export async function queryRows<T extends Row>(
  strings: TemplateStringsArray,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...values: any[]
): Promise<T[]> {
  return (await sql(strings, ...values)) as unknown as T[];
}
