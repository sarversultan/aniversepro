import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">About AniVersePro</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-muted-foreground">
          AniVersePro is dedicated to creating a vibrant community for anime and manga enthusiasts.
          Our platform provides a space for fans to discover, track, and discuss their favorite series.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What We Offer</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Comprehensive anime and manga database</li>
          <li>Personal tracking system for watched series</li>
          <li>Active community discussions</li>
          <li>Latest news and updates from the industry</li>
          <li>Personalized recommendations</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="text-muted-foreground">
          Have questions or suggestions? We'd love to hear from you!
          Reach out to us at support@aniversepro.com
        </p>
      </section>

      <section className="rounded-lg border bg-card p-6">
        <h2 className="text-2xl font-semibold">Join Our Community</h2>
        <p className="mt-2 text-muted-foreground">
          Become part of our growing community and connect with fellow anime and manga enthusiasts.
        </p>
        <button className="mt-4 rounded-md bg-primary w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-primary-foreground" aria-label="Sign Up Now">
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default AboutPage; 