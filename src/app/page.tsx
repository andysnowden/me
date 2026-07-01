import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-5">
      <div className="flex min-h-[70vh] flex-col justify-center py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Andy Snowden
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Notes from the road, and the work in between.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          A personal corner of the internet. Right now it&rsquo;s mostly about
          travel — where I&rsquo;ve been and what stuck with me. More to come.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/vacations"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-950"
          >
            Explore travels →
          </Link>
          <span className="text-sm text-muted">Work &amp; more, coming soon.</span>
        </div>
      </div>
    </section>
  );
}
