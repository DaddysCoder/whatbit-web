import { verifyMagicLinkAction } from "@/lib/actions/app-actions";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <main style={{ padding: 24, maxWidth: 480, margin: "0 auto" }}>
        <h1>Sign-in link invalid</h1>
        <p>This link is missing or incomplete. Request a new one from the sign-in page.</p>
      </main>
    );
  }

  await verifyMagicLinkAction(token);
  return null;
}
