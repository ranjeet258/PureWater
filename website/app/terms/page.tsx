import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the PureWater website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <h2>About this website</h2>
      <p>
        This website describes a product in development. Features, specifications and timelines
        may change, and descriptions of planned features are not a guarantee of availability.
      </p>
      <h2>Use of content</h2>
      <p>
        Content on this site is provided for general information. You may not copy or reuse it for
        commercial purposes without permission.
      </p>
      <h2>Liability</h2>
      <p>
        The site is provided as-is. To the extent permitted by law, PureWater is not liable for any
        loss arising from use of this website.
      </p>
    </LegalPage>
  );
}
