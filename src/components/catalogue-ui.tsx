import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronRight,
  FileUp,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Category, Product } from "@/lib/catalogue";

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-3 text-xs font-bold uppercase text-primary-light">{eyebrow}</p>
      <h2 className="text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {copy && <p className="mt-4 leading-7 text-muted-foreground">{copy}</p>}
    </div>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/products/$category"
      params={{ category: category.slug }}
      className="group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-4/3 overflow-hidden bg-surface">
        <img
          src={category.image}
          alt={category.name}
          width={1000}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-bold text-primary">{category.name}</h3>
          <ChevronRight className="size-4 shrink-0 text-primary-light" />
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
      </div>
    </Link>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      <Link
        to="/products/$category/$product"
        params={{ category: product.category, product: product.slug }}
        className="aspect-square overflow-hidden bg-surface"
      >
        <img
          src={product.image}
          alt={product.name}
          width={1000}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase text-primary-light">{product.brand}</p>
        <h3 className="mt-2 font-bold text-primary">
          <Link
            to="/products/$category/$product"
            params={{ category: product.category, product: product.slug }}
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{product.spec}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Link
            to="/products/$category/$product"
            params={{ category: product.category, product: product.slug }}
            className="text-sm font-bold text-primary"
          >
            View product
          </Link>
          <Button asChild size="sm">
            <Link to="/quote" search={{ product: product.name }}>
              Quote
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ReassuranceStrip() {
  const items = [
    {
      icon: PackageCheck,
      title: "Broad product sourcing",
      copy: "One enquiry across essential categories.",
    },
    {
      icon: ShieldCheck,
      title: "Trade-focused support",
      copy: "Clear help for product requirements.",
    },
    { icon: Truck, title: "UAE supply enquiries", copy: "Discuss delivery needs with our team." },
  ];
  return (
    <div className="site-container relative z-10 -mt-8">
      <div className="grid rounded-xl border border-border bg-background md:grid-cols-3">
        {items.map(({ icon: Icon, title, copy }, index) => (
          <div
            key={title}
            className={`flex gap-4 p-6 ${index ? "border-t border-border md:border-l md:border-t-0" : ""}`}
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
              <Icon className="size-5" />
            </span>
            <div>
              <p className="font-bold text-primary">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuoteForm({
  compact = false,
  initialProduct = "",
}: {
  compact?: boolean;
  initialProduct?: string;
}) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div
        role="status"
        className="grid min-h-72 place-items-center rounded-xl border border-border bg-surface p-8 text-center"
      >
        <div>
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-success text-primary-foreground">
            <Check />
          </span>
          <h2 className="mt-5 text-2xl font-bold text-primary">Enquiry ready</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            This demonstration has not sent your details. Connect live contact delivery before
            launch.
          </p>
          <Button className="mt-6" onClick={() => setSent(false)}>
            Send another
          </Button>
        </div>
      </div>
    );
  return (
    <form onSubmit={submit} className="grid gap-5" aria-label="Request a quote">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name *">
          <Input required name="name" autoComplete="name" />
        </Field>
        <Field label="Company">
          <Input name="company" autoComplete="organization" />
        </Field>
        <Field label="Phone *">
          <Input required type="tel" name="phone" autoComplete="tel" />
        </Field>
        <Field label="Email">
          <Input type="email" name="email" autoComplete="email" />
        </Field>
      </div>
      <Field label="Product / requirement *">
        <Input required name="requirement" defaultValue={initialProduct} />
      </Field>
      {!compact && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Quantity">
            <Input name="quantity" />
          </Field>
          <Field label="Attach BOQ">
            <label className="flex h-12 cursor-pointer items-center gap-3 rounded-lg border border-input px-4 text-sm text-muted-foreground hover:border-primary">
              <FileUp className="size-4" /> Choose file
              <Input type="file" name="attachment" className="sr-only" />
            </label>
          </Field>
        </div>
      )}
      <Field label="Message">
        <Textarea name="message" rows={compact ? 3 : 5} />
      </Field>
      <Button type="submit" size="lg" className="w-full sm:w-fit">
        Submit enquiry <ArrowRight />
      </Button>
    </form>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-foreground">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="bg-primary py-14 text-primary-foreground md:py-20">
      <div className="site-container">
        <p className="text-xs font-bold uppercase text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/75">{copy}</p>
      </div>
    </section>
  );
}

export function WhatsAppButton() {
  return (
    <Button asChild variant="outline">
      <a href="https://wa.me/971588236312">
        <img
          src={`${import.meta.env.BASE_URL}whatsapp.webp`}
          alt=""
          aria-hidden="true"
          className="size-5 object-contain"
        />{" "}
        WhatsApp us
      </a>
    </Button>
  );
}
