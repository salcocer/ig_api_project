export default function PolicyPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        This Privacy Policy explains how the app handles data when you use the
        login dialog and general app features. It's intentionally concise — if
        you need more details, contact us at privacy@example.com.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Login dialog</h2>
        <p className="mb-2">
          When you sign in via the login dialog (OAuth), we request only the
          permissions necessary to provide the app's functionality — for
          example, basic profile and media access. You will see the permission
          scopes at the time of login.
        </p>
        <p className="mb-2">
          Access tokens are exchanged on the server side and stored in a secure
          server-side session. We do not persist tokens in localStorage or
          expose them to third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Data we collect</h2>
        <ul className="list-disc pl-5">
          <li>
            Basic profile information (username, display name, profile picture).
          </li>
          <li>Media items you choose to access through the app.</li>
          <li>Server-side session identifiers to keep you logged in.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How we use data</h2>
        <p className="mb-2">
          We use collected data to display your profile, fetch and show media,
          and provide core app features. We do not sell your personal data.
          Aggregated, non-identifying usage statistics may be used to improve
          the service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Third-party services</h2>
        <p className="mb-2">
          We rely on the OAuth provider (Instagram) for authentication and media
          access. Please review their privacy policy for details on how they
          handle data and permissions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Security</h2>
        <p className="mb-2">
          We take reasonable measures to protect your data in transit and at
          rest on the server. If you discover a security issue, please contact
          us immediately.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p>
          If you have questions about this policy or want to request data
          deletion, email{" "}
          <a href="mailto:privacy@example.com" className="text-blue-600">
            saavalencia97@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
