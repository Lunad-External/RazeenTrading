import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { CategoryCard, PageIntro, ProductCard } from "@/components/catalogue-ui";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { categories, products } from "@/lib/catalogue";

const PRODUCTS_PER_PAGE = 20;

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    category: typeof search["category"] === "string" ? search["category"] : "all",
    page:
      typeof search["page"] === "number" && Number.isInteger(search["page"]) && search["page"] > 0
        ? search["page"]
        : 1,
  }),
  head: () => ({
    meta: [
      { title: "Products | Razeen Building Materials UAE" },
      {
        name: "description",
        content:
          "Browse building materials, hardware, power tools, safety products and site essentials.",
      },
      { property: "og:title", content: "Products | Razeen Building Materials UAE" },
      {
        property: "og:description",
        content: "Browse Razeen product categories and send a focused product enquiry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});
function ProductsPage() {
  const { q: query, category, page: requestedPage } = Route.useSearch();
  const navigate = Route.useNavigate();
  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "all" || product.category === category) &&
          `${product.name} ${product.brand ?? ""} ${product.manufacturer ?? ""} ${product.summary}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, category],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const page = Math.min(requestedPage, totalPages);
  const visibleProducts = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
  const pageNumbers =
    totalPages <= 5 ? Array.from({ length: totalPages }, (_, index) => index + 1) : [1, 2, 3];

  function goToPage(nextPage: number) {
    navigate({
      search: {
        q: query,
        category,
        page: Math.min(Math.max(nextPage, 1), totalPages),
      },
    });
  }

  return (
    <>
      <PageIntro
        eyebrow="Product catalogue"
        title="Find the right materials and tools"
        copy="Browse the supplied catalogue by category or search for a product requirement."
      />
      <section className="section-space">
        <div className="site-container">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                navigate({
                  search: { q: event.target.value, category, page: 1 },
                });
              }}
              placeholder="Search products, brands or specifications"
              aria-label="Search catalogue"
              className="h-12 pl-12"
            />
          </div>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {["all", ...categories.map((item) => item.slug)].map((slug) => (
              <button
                key={slug}
                onClick={() => {
                  navigate({
                    search: { q: query, category: slug, page: 1 },
                  });
                }}
                className={`min-h-11 shrink-0 rounded-lg border px-4 text-sm font-bold ${category === slug ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary"}`}
              >
                {slug === "all"
                  ? "All products"
                  : categories.find((item) => item.slug === slug)?.name}{" "}
                <span className="opacity-70">
                  (
                  {slug === "all"
                    ? products.length
                    : products.filter((product) => product.category === slug).length}
                  )
                </span>
              </button>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="mt-10 rounded-xl border border-border bg-surface p-10 text-center">
              <h2 className="font-bold text-primary">No matching products</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another term or{" "}
                <Link to="/quote" className="font-bold text-primary-light">
                  send your exact requirement
                </Link>
                .
              </p>
            </div>
          )}
          {filtered.length > 0 && (
            <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                Page <span className="text-primary">{page}</span> of{" "}
                <span className="text-primary">{totalPages}</span>
              </p>
              <Pagination className="mx-0 w-auto justify-start sm:justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      aria-disabled={page === 1}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(page - 1);
                      }}
                    />
                  </PaginationItem>
                  {pageNumbers.map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={page === pageNumber}
                        aria-label={`Go to page ${pageNumber}`}
                        onClick={(event) => {
                          event.preventDefault();
                          goToPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {totalPages > 5 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      {[totalPages - 1, totalPages].map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            isActive={page === pageNumber}
                            aria-label={`Go to page ${pageNumber}`}
                            onClick={(event) => {
                              event.preventDefault();
                              goToPage(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </>
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      aria-disabled={page === totalPages}
                      className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          <h2 className="mt-20 text-2xl font-bold text-primary">Browse all categories</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((item) => (
              <CategoryCard key={item.slug} category={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
