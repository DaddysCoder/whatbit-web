const D1_DATABASE_ID = "23e7166e-5001-4e39-bba8-ff53a811b9f6";
const KV_NAMESPACE_ID = "d7b498e7fd1e43a0ad8ecf21f2d11467";

/** Whether the D1/KV REST credentials AI Blueprint needs are present in this environment. */
export function isCloudflareConfigured(): boolean {
  return Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_AI_BLUEPRINT_API_TOKEN);
}

function accountId() {
  const id = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!id) throw new Error("CLOUDFLARE_ACCOUNT_ID is not configured.");
  return id;
}

function apiToken() {
  const token = process.env.CLOUDFLARE_AI_BLUEPRINT_API_TOKEN;
  if (!token) throw new Error("CLOUDFLARE_AI_BLUEPRINT_API_TOKEN is not configured.");
  return token;
}

type D1QueryResult<T> = {
  results: T[];
  success: boolean;
  meta: { changes: number; last_row_id: number };
};

/** Runs a single SQL statement against the ai-blueprint D1 database over Cloudflare's REST API. */
export async function d1Query<T = Record<string, unknown>>(
  sql: string,
  params: Array<string | number | null> = [],
): Promise<D1QueryResult<T>> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId()}/d1/database/${D1_DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql, params }),
    },
  );

  const body = (await response.json().catch(() => null)) as
    | { success?: boolean; result?: D1QueryResult<T>[]; errors?: Array<{ message?: string }> }
    | null;

  if (!response.ok || !body?.success || !body.result?.[0]) {
    const message = body?.errors?.[0]?.message || `D1 query failed with status ${response.status}.`;
    throw new Error(message);
  }

  return body.result[0];
}

/** Reads a value from the ai-blueprint-admin-sessions KV namespace. Returns null if absent. */
export async function kvGet(key: string): Promise<string | null> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId()}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${encodeURIComponent(key)}`,
    { headers: { Authorization: `Bearer ${apiToken()}` } },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`KV read failed with status ${response.status}.`);
  return response.text();
}

/** Writes a value to the ai-blueprint-admin-sessions KV namespace, optionally with a TTL in seconds. */
export async function kvPut(key: string, value: string, expirationTtl?: number): Promise<void> {
  const url = new URL(
    `https://api.cloudflare.com/client/v4/accounts/${accountId()}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${encodeURIComponent(key)}`,
  );
  if (expirationTtl) url.searchParams.set("expiration_ttl", String(expirationTtl));

  const response = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${apiToken()}` },
    body: value,
  });
  if (!response.ok) throw new Error(`KV write failed with status ${response.status}.`);
}

/** Deletes a value from the ai-blueprint-admin-sessions KV namespace. */
export async function kvDelete(key: string): Promise<void> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId()}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${encodeURIComponent(key)}`,
    { method: "DELETE", headers: { Authorization: `Bearer ${apiToken()}` } },
  );
  if (!response.ok && response.status !== 404) throw new Error(`KV delete failed with status ${response.status}.`);
}
