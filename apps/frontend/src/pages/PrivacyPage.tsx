import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      
      <section className="space-y-4">
        <p className="text-muted-foreground">
          At AniVersePro, we take your privacy seriously. This policy outlines how we collect,
          use, and protect your personal information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Account information (username, email, password)</li>
          <li>Profile information (avatar, bio)</li>
          <li>Usage data (viewing history, preferences)</li>
          <li>Device and browser information</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>To provide and improve our services</li>
          <li>To personalize your experience</li>
          <li>To communicate with you about updates and features</li>
          <li>To ensure platform security</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Data Protection</h2>
        <p className="text-muted-foreground">
          We implement industry-standard security measures to protect your data.
          Your information is encrypted and stored securely.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Rights</h2>
        <p className="text-muted-foreground">
          You have the right to access, modify, or delete your personal information.
          Contact us if you wish to exercise these rights.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cookies</h2>
        <p className="text-muted-foreground">
          We use cookies to improve your browsing experience and analyze site traffic.
          You can control cookie settings through your browser preferences.
        </p>
      </section>

      <section className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        <p>Last updated: February 2024</p>
        <p className="mt-2">
          For privacy-related inquiries, please contact us at privacy@aniversepro.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage; 