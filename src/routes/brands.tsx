import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/catalogue-ui";
import { products } from "@/lib/catalogue";

const brands = Array.from(
  new Set(
    products.flatMap((product) => {
      const supplied = product.attributes["Brands Supplied"];
      const suppliedBrands = Array.isArray(supplied) ? supplied : supplied ? [supplied] : [];
      return [...suppliedBrands, product.brand, product.manufacturer].filter(
        (value): value is string => Boolean(value),
      );
    }),
  ),
).sort();
export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands | Razeen Building Materials UAE" },
      {
        name: "description",
        content: "Explore brands and manufacturers listed in Razeen's supplied product catalogues.",
      },
      { property: "og:title", content: "Brands | Razeen Building Materials UAE" },
      {
        property: "og:description",
        content: "Product brands organized for clear trade discovery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandsPage,
});
function BrandsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Brands"
        title="Product ranges, clearly organized"
        copy="Brands and manufacturers are taken directly from the supplied product catalogues."
      />
      <section className="section-space">
        <div className="site-container grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {brands.map((brand) => (
            <div
              key={brand}
              className="grid min-h-40 place-items-center bg-background p-6 text-center text-xl font-extrabold text-primary"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
