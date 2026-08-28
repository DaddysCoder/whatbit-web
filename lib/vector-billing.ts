export const VECTOR_PRICE_LABEL = "A$9 / month";
export const VECTOR_UPGRADE_LABEL = "Upgrade — A$9/month";
export const VECTOR_UNLOCK_LABEL = "Unlock with Vector — A$9/month";
export const VECTOR_CHECKOUT_PATH = "/api/billing/checkout";
export const VECTOR_PORTAL_PATH = "/api/billing/portal";
export const VECTOR_STATUS_PATH = "/api/billing/status";

const billingBase = process.env.NEXT_PUBLIC_VECTOR_API_URL?.replace(/\/$/, "") ?? "";

function billingUrl(path: string) {
  return `${billingBase}${path}`;
}

export type VectorBillingStatus = {
  isPaid: boolean;
  canManage: boolean;
};

export async function fetchVectorBillingStatus(): Promise<VectorBillingStatus> {
  try {
    const res = await fetch(billingUrl(VECTOR_STATUS_PATH), {
      credentials: "include",
    });
    if (!res.ok) return { isPaid: false, canManage: false };
    const data = (await res.json()) as Partial<VectorBillingStatus>;
    return {
      isPaid: Boolean(data.isPaid),
      canManage: Boolean(data.canManage),
    };
  } catch {
    return { isPaid: false, canManage: false };
  }
}

export async function startVectorCheckout(): Promise<void> {
  const res = await fetch(billingUrl(VECTOR_CHECKOUT_PATH), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Unable to start checkout. Please try again.");
  }

  const data = (await res.json()) as { url?: string };
  if (!data.url) {
    throw new Error("Checkout URL was not returned.");
  }

  window.location.href = data.url;
}

export async function openVectorBillingPortal(): Promise<void> {
  const res = await fetch(billingUrl(VECTOR_PORTAL_PATH), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Unable to open billing portal. Please try again.");
  }

  const data = (await res.json()) as { url?: string };
  if (!data.url) {
    throw new Error("Billing portal URL was not returned.");
  }

  window.location.href = data.url;
}
