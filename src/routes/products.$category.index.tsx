import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageIntro, ProductCard } from "@/components/catalogue-ui";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getCategory, products } from "@/lib/catalogue";

const PRODUCTS_PER_PAGE = 20;

export const Route = createFileRoute("/products/$category/")({
  validateSearch: (search: Record<string, unknown>) => ({
    page:
      typeof search["page"] === "number" && Number.isInteger(search["page"]) && search["page"] > 0
        ? search["page"]
        : 1,
  }),
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return category;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} | Razeen UAE` : "Category unavailable | Razeen" },
      {
        name: "description",
        content: loaderData?.description ?? "Browse Razeen product categories.",
      },
      {
        property: "og:title",
        content: loaderData ? `${loaderData.name} | Razeen UAE` : "Category unavailable | Razeen",
      },
      {
        property: "og:description",
        content: loaderData?.description ?? "Browse Razeen product categories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoryPage,
});
function CategoryPage() {
  const category = Route.useLoaderData();
  const { page: requestedPage } = Route.useSearch();
  const navigate = Route.useNavigate();
  const matches = products.filter((product) => product.category === category.slug);
  const totalPages = Math.max(1, Math.ceil(matches.length / PRODUCTS_PER_PAGE));
  const page = Math.min(requestedPage, totalPages);
  const visibleProducts = matches.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);
  const pageNumbers =
    totalPages <= 5 ? Array.from({ length: totalPages }, (_, index) => index + 1) : [1, 2, 3];

  function goToPage(nextPage: number) {
    navigate({
      search: {
        page: Math.min(Math.max(nextPage, 1), totalPages),
      },
    });
  }

  return (
    <>
      <PageIntro eyebrow="Product category" title={category.name} copy={category.description} />
      <section className="section-space">
        <div className="site-container">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link to="/products" search={{ q: "", category: "all", page: 1 }}>
              Products
            </Link>
            <ChevronRight className="size-4" />
            <span>{category.name}</span>
          </nav>
          {matches.length ? (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
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
            </>
          ) : (
            <div className="rounded-xl border border-border bg-surface p-10">
              <h2 className="text-xl font-bold text-primary">Tell us what you need</h2>
              <p className="mt-2 text-muted-foreground">
                The full {category.name.toLowerCase()} range is being prepared. Send an enquiry for
                specific products.
              </p>
              <Link to="/quote" className="mt-5 inline-block font-bold text-primary-light">
                Request this category →
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
