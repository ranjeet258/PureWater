import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Cpu,
  Gauge,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Thermometer,
  TrainFront,
  TrendingUp,
  Zap,
  Droplets,
  Smartphone,
  Info,
} from "lucide-react";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import Image from "next/image";
import machineImg from "@/public/images/purewater-machine.jpg";
import ContactForm from "@/components/ContactForm";
import { site, type Status } from "@/lib/site";

/*
 * Feature statuses: update these as each part is built and tested.
 * "working" should only be used once a feature is implemented AND tested.
 */
const steps: { title: string; text: string; icon: typeof Droplets; status: Status }[] = [
  {
    title: "Choose quantity",
    text: "Select the amount of chilled water you need on the machine.",
    icon: Droplets,
    status: "prototype",
  },
  {
    title: "Scan & pay",
    text: "Scan the QR code shown on the machine and pay from your phone.",
    icon: QrCode,
    status: "prototype",
  },
  {
    title: "Payment verified",
    text: "Our backend confirms the payment server-side. Nothing is dispensed on trust.",
    icon: ShieldCheck,
    status: "prototype",
  },
  {
    title: "Water dispensed",
    text: "Once payment is verified, the machine authorizes dispensing of the selected quantity.",
    icon: Zap,
    status: "prototype",
  },
];

const tech: { title: string; text: string; icon: typeof Cpu; status: Status }[] = [
  {
    title: "IoT machine control",
    text: "A connected controller links each machine to our backend for commands and status.",
    icon: Cpu,
    status: "prototype",
  },
  {
    title: "QR digital payments",
    text: "Pay by scanning a QR code. Live payments begin once our merchant account is approved and tested.",
    icon: Smartphone,
    status: "prototype",
  },
  {
    title: "Backend payment verification",
    text: "Every transaction is confirmed server-side before the machine is allowed to dispense.",
    icon: ShieldCheck,
    status: "prototype",
  },
  {
    title: "Automated dispensing",
    text: "Controlled valve and flow logic dispense the selected quantity.",
    icon: Gauge,
    status: "prototype",
  },
  {
    title: "Temperature & system status",
    text: "Monitoring of water temperature and machine health for remote visibility.",
    icon: Thermometer,
    status: "planned",
  },
  {
    title: "Modular hardware",
    text: "Designed so new modules can be added as the platform grows.",
    icon: Layers,
    status: "planned",
  },
];

const applications = [
  { title: "Educational campuses", icon: GraduationCap },
  { title: "Offices & workplaces", icon: Briefcase },
  { title: "Public spaces", icon: MapPin },
  { title: "Transport hubs", icon: TrainFront },
  { title: "Commercial establishments", icon: ShoppingBag },
];

const reasons = [
  { title: "Convenient chilled water", text: "Chilled drinking water available where people need it.", icon: Snowflake },
  { title: "Digital payments", text: "Pay from your phone with a quick QR scan, no cash needed.", icon: QrCode },
  { title: "Automated operation", text: "Self-service machines designed to run without an attendant.", icon: Zap },
  { title: "Built to scale", text: "Connected machines that can be added location by location.", icon: TrendingUp },
  { title: "Technology-led service", text: "Remote visibility designed to help keep machines running.", icon: Cpu },
];

const socials = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: Linkedin },
].filter((s) => s.href);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-aqua/20 blur-3xl"
        />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/15">
              <span className="h-1.5 w-1.5 rounded-full bg-aqua" />
              Early-stage · Prototype in development
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Pure Water.
              <br />
              <span className="text-brand">Smarter Access.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600">
              Discover a smarter way to access chilled drinking water through automated vending
              solutions powered by connected technology and digital payments.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white hover:bg-navy"
              >
                Explore Our Solution <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="#partner"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-navy ring-1 ring-slate-200 hover:ring-brand"
              >
                Partner With Us
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <figure className="relative">
              <Image
                src={machineImg}
                alt="PureWater smart chilled-water vending machine with QR payment panel, shown in a building lobby"
                priority
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full rounded-3xl shadow-2xl shadow-brand/15 ring-1 ring-slate-200"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur">
                Concept render
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <Section
        id="about"
        eyebrow="About PureWater"
        title="Making chilled drinking water easier to reach."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <p className="text-lg text-slate-600">
              PureWater is an early-stage startup building smart, automated vending machines for
              chilled drinking water. We combine connected hardware, automated dispensing and
              digital payments so anyone can get chilled water quickly, without cash and without
              an attendant.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-slate-600">
              We are currently developing and testing our prototype. Our next step is pilot
              deployments with partners such as campuses, workplaces and public venues, so we can
              learn from real use before scaling up.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* How it works */}
      <Section
        id="how-it-works"
        eyebrow="How it works"
        title="Four simple steps."
        intro="Each step shows its current development status, so you know exactly where we are."
        tinted
      >
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 0.08}
              className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200"
            >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-bold text-slate-300">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-bold text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{s.text}</p>
                <div className="mt-4">
                  <StatusBadge status={s.status} />
                </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Technology */}
      <Section
        id="technology"
        eyebrow="Our technology"
        title="Connected hardware, verified payments."
        intro="We only mark a feature as working once it has been built and tested."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tech.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl p-6 ring-1 ring-slate-200">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-aqua/10 text-aqua">
                    <t.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <StatusBadge status={t.status} />
                </div>
                <h3 className="mt-5 font-bold text-navy">{t.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 flex items-start gap-2 rounded-xl bg-mist p-4 text-sm text-slate-600">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
            Payment processing is not live yet. It will be enabled after merchant account approval
            and end-to-end testing.
          </p>
        </Reveal>
      </Section>

      {/* Applications */}
      <Section
        id="applications"
        eyebrow="Applications"
        title="Where PureWater could fit."
        intro="Potential locations for pilot and future deployments."
        tinted
      >
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {applications.map((a, i) => (
            <Reveal
              as="li"
              key={a.title}
              delay={i * 0.06}
              className="flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center ring-1 ring-slate-200"
            >
              <a.icon className="h-7 w-7 text-brand" aria-hidden />
              <span className="mt-3 text-sm font-semibold text-navy">{a.title}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Why PureWater */}
      <Section id="why" eyebrow="Why PureWater" title="Simple, smart and practical.">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.08}>
              <div className="flex gap-4">
                <r.icon className="mt-1 h-6 w-6 shrink-0 text-aqua" aria-hidden />
                <div>
                  <h3 className="font-bold text-navy">{r.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{r.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Partnership */}
      <section id="partner" aria-labelledby="partner-title" className="px-4 pb-20 sm:px-6">
        <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-brand to-aqua p-10 text-white sm:p-14">
          <div className="max-w-2xl">
            <Building2 className="h-8 w-8 opacity-80" aria-hidden />
            <h2 id="partner-title" className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Help Build the Future of Smart Water Access.
            </h2>
            <p className="mt-4 text-lg text-white/85">
              We are looking for campus administrators, property owners, installation partners and
              collaborators interested in hosting a pilot deployment. Tell us about your site and
              we will reach out.
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-navy hover:bg-mist"
            >
              Become a Partner <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <Section
        id="contact"
        eyebrow="Contact"
        title="Get in touch."
        intro="Questions, pilot enquiries or partnership ideas: send us a message."
        tinted
      >
        <div className="grid gap-10 md:grid-cols-5">
          <Reveal className="space-y-6 md:col-span-2">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-brand" aria-hidden />
              <div>
                <p className="font-semibold text-navy">Email</p>
                <a href={`mailto:${site.email}`} className="text-slate-600 hover:text-brand">
                  {site.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-brand" aria-hidden />
              <div>
                <p className="font-semibold text-navy">Phone</p>
                <a href={`tel:${site.phone}`} className="text-slate-600 hover:text-brand">
                  {site.phone}
                </a>
              </div>
            </div>
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white text-navy ring-1 ring-slate-200 hover:text-brand"
                  >
                    <s.icon className="h-5 w-5" aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
