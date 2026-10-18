"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#technology", label: "Technology" },
  { href: "/#applications", label: "Applications" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" aria-label="PureWater home">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-brand">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#partner"
          className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-navy md:inline-block"
        >
          Partner With Us
        </Link>

        <button
          type="button"
          className="rounded-md p-2 text-navy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="space-y-1 border-t border-slate-100 bg-white px-4 py-3 md:hidden"
        >
          {[...links, { href: "/#partner", label: "Partner With Us" }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-mist"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
