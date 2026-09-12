import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "4rem auto", padding: "0 1.5rem" }}>
      <h1>AI Blueprint</h1>
      <p>
        This is a restricted access portal. Assessment entry requires a token
        link provided after checkout.
      </p>
      <p>
        <Link href="/assessment?token=">
          Open the assessment (token required)
        </Link>
      </p>
      <p>
        <Link href="/admin">Admin sign-in</Link>
      </p>
    </main>
  );
}
