import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/razeen-hero.jpg";
import { Button } from "@/components/ui/button";
import {
  CategoryCard,
  ProductCard,
  ReassuranceStrip,
  SectionHeading,
} from "@/components/catalogue-ui";
import { categories, products } from "@/lib/catalogue";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Razeen Building Materials | Tools & Supplies UAE" },
      {
        name: "description",
        content:
          "Discover building materials, professional tools, safety supplies and maintenance essentials for projects across the UAE.",
      },
      { property: "og:title", content: "Razeen Building Materials | Tools & Supplies UAE" },
      {
        property: "og:description",
        content:
          "Building materials, tools and supply solutions for construction, repair and maintenance across the UAE.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <section className="relative min-h-[680px] overflow-hidden bg-primary text-primary-foreground md:min-h-[720px]">
        <img
          src={heroImage}
          alt="Construction materials and professional tools"
          width={1600}
          height={1008}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-primary/35 md:bg-transparent" />
        <div className="site-container relative flex min-h-[680px] items-center py-16 md:min-h-[720px]">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase text-accent">
              Supplying projects across the UAE
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Building Materials.
              <br />
              Tools. Solutions.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-primary-foreground/80">
              Reliable products for construction, repair and maintenance—from one practical supply
              partner.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/quote">
                  Request a Quote <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border border-primary-foreground/40 bg-primary/60 text-primary-foreground hover:bg-primary"
              >
                <a href="https://wa.me/971588236312">
                  <img
                    src="/whatsapp.webp"
                    alt=""
                    aria-hidden="true"
                    className="size-5 object-contain"
                  />{" "}
                  WhatsApp us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ReassuranceStrip />
      <section className="section-space">
        <div className="site-container">
          <SectionHeading
            eyebrow="Browse by need"
            title="Everything your project needs"
            copy="Move quickly from broad requirements to the right product category."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
          <Button asChild variant="outline" className="mt-8">
            <Link to="/products">
              Explore all products <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
      <section className="section-space bg-surface">
        <div className="site-container">
          <SectionHeading
            eyebrow="Selected catalogue"
            title="Featured products"
            copy="A sample of the product types Razeen can support. Final catalogue details will be confirmed before launch."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Built for procurement"
              title="Send the requirement. We’ll help with the next step."
              copy="Whether you know the exact item or have a broader material list, start with a clear enquiry and optional BOQ upload."
            />
            <Button asChild size="lg">
              <Link to="/quote">
                Start your enquiry <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
            <div className="bg-background p-7">
              <p className="text-sm font-bold text-primary">01</p>
              <h3 className="mt-8 font-bold">Share your list</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Describe products or upload a BOQ.
              </p>
            </div>
            <div className="bg-background p-7">
              <p className="text-sm font-bold text-primary">02</p>
              <h3 className="mt-8 font-bold">Add project details</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Tell us quantity and contact needs.
              </p>
            </div>
            <div className="bg-background p-7">
              <p className="text-sm font-bold text-primary">03</p>
              <h3 className="mt-8 font-bold">Review options</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Discuss suitable supply options.
              </p>
            </div>
            <div className="bg-primary p-7 text-primary-foreground">
              <p className="text-sm font-bold text-accent">04</p>
              <h3 className="mt-8 font-bold">Plan fulfilment</h3>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/70">
                Confirm the next steps with sales.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-accent py-12">
        <div className="site-container flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-accent-foreground md:text-3xl">
              Need materials for an upcoming project?
            </h2>
            <p className="mt-2 text-accent-foreground/75">
              Send your requirements and start a focused conversation.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/quote">
              Request a Quote <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
