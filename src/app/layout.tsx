import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://andytsnowden.me"),
  title: {
    default: "Andy Snowden",
    template: "%s · Andy Snowden",
  },
  description: "The personal site of Andy Snowden, travel, work, and everything in between.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          Andy&nbsp;Snowden
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/vacations"
            className="text-muted transition-colors hover:text-ink"
          >
            Travel
          </Link>
          <span className="cursor-default text-line" title="Coming soon">
            Work
          </span>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {"2026"} Andy Snowden</p>
        <p className="font-display italic">andytsnowden.me</p>
      </div>
    </footer>
  );
}
