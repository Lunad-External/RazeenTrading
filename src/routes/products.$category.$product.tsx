import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductCard, WhatsAppButton } from "@/components/catalogue-ui";
import { categories, getProduct, products } from "@/lib/catalogue";
// Placeholder attributes shared by every product until real data is supplied.
const attributes = [
  { label: "Material", value: "Premium grade" },
  { label: "Origin", value: "Imported" },
  { label: "Availability", value: "In stock" },
  { label: "Supply", value: "UAE-wide" },
];
export const Route = createFileRoute("/products/$category/$product")({
  loader: ({ params }) => {
    const product = getProduct(params.product);
    if (!product || product.category !== params.category) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} | Razeen UAE` : "Product unavailable | Razeen" },
      {
        name: "description",
        content: loaderData?.description ?? "Product information from Razeen.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.name} | Razeen UAE` : "Product unavailable | Razeen",
      },
      {
        property: "og:description",
        content: loaderData?.description ?? "Product information from Razeen.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});
function ProductPage() {
  const product = Route.useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const categoryName =
    categories.find((item) => item.slug === product.category)?.name ?? "Products";
  // Placeholder SKU derived from catalogue order until real SKUs exist.
  const sku = `RZN-${String(products.findIndex((item) => item.slug === product.slug) + 1).padStart(5, "0")}`;
  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 4);
  return (
    <>
      <section className="site-container py-8 md:py-10">
        <Breadcrumb>
          <BreadcrumbList className="uppercase">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products/$category" params={{ category: product.category }}>
                  {categoryName}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div className="aspect-square overflow-hidden rounded-xl border border-border bg-white lg:sticky lg:top-28 lg:self-start">
            <img
              src={product.image}
              alt={product.name}
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <h1 className="text-balance text-3xl font-extrabold uppercase text-primary md:text-4xl xl:text-5xl">
                {product.name}
              </h1>
              <span className="rounded-md bg-success/15 px-2.5 py-1 text-xs font-bold text-success">
                In Stock
              </span>
            </div>
            <ul className="mt-5 grid max-w-prose gap-2 text-foreground">
              {product.specs.slice(0, 3).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-5 flex flex-wrap gap-x-8 gap-y-1 text-muted-foreground">
              <span>SKU: {sku}</span>
              <span>Brand: {product.brand}</span>
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
              {attributes.map(({ label, value }) => (
                <div key={label} className="bg-card p-4">
                  <dt className="text-sm font-semibold text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-bold text-primary">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <p id="qty-label" className="text-sm font-semibold text-primary">
                Quantity
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <div
                  role="group"
                  aria-labelledby="qty-label"
                  className="inline-flex h-12 items-center rounded-lg border border-input"
                >
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((q) => q - 1)}
                    className="grid size-12 place-items-center text-primary transition hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-primary-light disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <output aria-live="polite" className="w-12 text-center font-bold tabular-nums">
                    {quantity}
                  </output>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="grid size-12 place-items-center text-primary transition hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-primary-light"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <Button asChild size="lg">
                  <Link to="/quote" search={{ product: product.name, quantity }}>
                    Send enquiry
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-10 rounded-xl bg-surface-strong p-6">
              <h2 className="text-xl font-bold text-primary">Need help in buying?</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Talk to our team for expert assistance
                with this product.
              </p>
              <div className="mt-4">
                <WhatsAppButton />
              </div>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section-space bg-surface">
          <div className="site-container">
            <h2 className="text-3xl font-bold text-primary">Related products</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
