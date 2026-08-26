import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { createCase } from "@/lib/services/cases";

export default async function NewCasePage() {
  const session = await requireSession();
  const id = await createCase(session.id);
  redirect(`/cases/${id}?step=1`);
}
