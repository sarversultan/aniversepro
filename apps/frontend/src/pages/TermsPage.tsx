import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      
      <section className="space-y-4">
        <p className="text-muted-foreground">
          By accessing and using AniVersePro, you agree to be bound by these Terms of Service.
          Please read them carefully before using our platform.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. User Agreement</h2>
        <p className="text-muted-foreground">
          By using AniVersePro, you agree to follow our community guidelines and use the platform
          responsibly. Users must be at least 13 years old to create an account.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Content Guidelines</h2>
        <p className="text-muted-foreground">
          Users are responsible for the content they post. Content must not violate copyright
          laws or contain inappropriate material. We reserve the right to remove content that
          violates our guidelines.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Privacy</h2>
        <p className="text-muted-foreground">
          We respect your privacy and protect your personal information. Please review our
          Privacy Policy for more details on how we handle user data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Account Security</h2>
        <p className="text-muted-foreground">
          Users are responsible for maintaining the security of their accounts and must notify
          us immediately of any unauthorized use or security breaches.
        </p>
      </section>

      <section className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        <p>Last updated: February 2024</p>
        <p className="mt-2">
          For questions about these terms, please contact us at legal@aniversepro.com
        </p>
      </section>
    </div>
  );
};

export default TermsPage; 