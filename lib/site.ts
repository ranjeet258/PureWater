export const site = {
  name: "PureWater",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  title: "PureWater — Pure Water. Smarter Access.",
  description:
    "PureWater is an early-stage startup developing smart, automated chilled drinking-water vending machines with QR-based digital payments and controlled dispensing.",
  // Placeholder — replace with the real startup inbox before launch.
  email: "hello@purewater.example",
  // Add real profile URLs when available. Empty entries are hidden.
  socials: {
    linkedin: "",
    x: "",
    instagram: "",
  },
};

/**
 * Feature status shown on the site. Keep this honest:
 * only mark something "working" once it has been built AND tested.
 */
export type Status = "working" | "prototype" | "planned";

export const statusLabel: Record<Status, string> = {
  working: "Working & tested",
  prototype: "In prototype",
  planned: "Planned",
};
