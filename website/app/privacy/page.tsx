import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PureWater handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <h2>Information we collect</h2>
      <p>
        When you use our contact form we collect the name, email address, organization and message
        you provide. We use this only to respond to your enquiry.
      </p>
      <h2>How we use it</h2>
      <p>
        We do not sell your information. Enquiries are delivered to our team by email through a
        third-party email service provider.
      </p>
      <h2>Retention</h2>
      <p>We keep enquiries only as long as needed to respond and follow up on them.</p>
      <h2>Contact</h2>
      <p>
        To ask about or delete your data, email us at{" "}
        <a href={`mailto:${site.email}`} className="text-brand hover:underline">
          {site.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
