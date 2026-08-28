import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Vector billing is not configured on this environment yet. Connect the Vector backend Stripe portal handler to POST /api/billing/portal.",
    },
    { status: 503 }
  );
}
