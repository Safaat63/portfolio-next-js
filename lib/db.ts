import postgres from "postgres";

export type Row = Record<string, unknown>;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("⚠️ DATABASE_URL is not defined in environment variables. Database queries will return empty results.");
}

const requiresSsl = connectionString?.includes("sslmode=require");

declare global {
  var _sql: ReturnType<typeof postgres> | undefined;
}

const rawSql =
  globalThis._sql ||
  postgres(connectionString || "postgresql://localhost:5432/fallback", {
    ssl: requiresSsl ? "require" : false,
    connect_timeout: 5,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis._sql = rawSql;
}

// Resilient wrapper: Catches connection errors (e.g. ENOTFOUND, ECONNREFUSED)
// on SELECT queries so the website renders gracefully instead of throwing 500 runtime crashes.
function createResilientSql(client: typeof rawSql): typeof rawSql {
  return new Proxy(client, {
    apply(target, thisArg, argArray) {
      const isTemplate = Array.isArray(argArray[0]);
      const queryString = isTemplate ? (argArray[0] as TemplateStringsArray).join(" ") : "";
      const isSelect = !queryString || /^\s*SELECT/i.test(queryString.trim());

      const result = Reflect.apply(target, thisArg, argArray);
      if (result && typeof result.catch === "function") {
        return result.catch((err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          console.warn(`[Database Warning]: ${message}`);
          if (isSelect) {
            return [] as unknown as postgres.RowList<Row[]>;
          }
          throw err;
        });
      }
      return result;
    },
    get(target, prop, receiver) {
      if (prop === "unsafe") {
        return function (query: string, values?: unknown[]) {
          const isSelect = /^\s*SELECT/i.test(query.trim());
          return target.unsafe(query, values as any).catch((err: unknown) => {
            const message = err instanceof Error ? err.message : String(err);
            console.warn(`[Database unsafe Warning]: ${message}`);
            if (isSelect) {
              return [] as unknown as postgres.RowList<Row[]>;
            }
            throw err;
          });
        };
      }
      const val = Reflect.get(target, prop, receiver);
      return typeof val === "function" ? val.bind(target) : val;
    },
  });
}

export const sql = createResilientSql(rawSql);

export async function queryRows<T extends Row>(
  strings: TemplateStringsArray,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...values: any[]
): Promise<T[]> {
  return (await sql(strings, ...values)) as unknown as T[];
}
