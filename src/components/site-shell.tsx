import { Link } from "@tanstack/react-router";
import { Menu, Phone, Search, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/products" as const, label: "Products" },
  { to: "/brands" as const, label: "Brands" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

export function BrandMark() {
  return (
    <Link to="/" aria-label="Razeen home" className="flex shrink-0 items-center">
      <img
        src={`${import.meta.env.BASE_URL}razeenlogo.jpg`}
        alt="Razeen Building Materials Trading LLC"
        width={320}
        height={100}
        className="h-14 w-auto object-contain"
      />
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex">
          <BrandMark />
          <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-semibold text-foreground transition-colors hover:text-primary-light"
                activeProps={{ className: "text-primary-light" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/products"
              search={{ q: "" }}
              aria-label="Search products"
              className="grid size-11 place-items-center rounded-lg text-primary hover:bg-secondary"
            >
              <Search className="size-5" />
            </Link>
            <Button asChild>
              <Link to="/quote" search={{ product: "" }}>
                Request a Quote
              </Link>
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav
            className="border-t border-border bg-background px-4 py-5 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-lg flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 font-semibold hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-3">
                <Link to="/quote" search={{ product: "" }} onClick={() => setOpen(false)}>
                  Request a Quote
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="bg-primary pb-20 text-primary-foreground md:pb-0">
        <div className="site-container py-14">
          <div className="grid gap-10 border-b border-primary-foreground/20 pb-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <img
                src={`${import.meta.env.BASE_URL}razeenlogo.jpg`}
                alt="Razeen Building Materials Trading LLC"
                width={320}
                height={100}
                className="h-14 w-auto rounded bg-white object-contain"
              />
              <p className="mt-4 max-w-md text-sm leading-6 text-primary-foreground/75">
                Building materials, tools and supply solutions for construction, repair and
                maintenance across the UAE.
              </p>
              <div className="mt-4 grid gap-2 text-sm text-primary-foreground/75">
                <span>Umm Ramool, Rashidiya, Dubai, UAE</span>
                <span>PO Box 76806</span>
                <a href="mailto:rbmsale@gmail.com" className="hover:text-primary-foreground">
                  rbmsale@gmail.com
                </a>
              </div>
            </div>
            <div>
              <p className="font-bold">Explore</p>
              <div className="mt-4 grid gap-3 text-sm text-primary-foreground/75">
                <Link to="/products">Products</Link>
                <Link to="/brands">Brands</Link>
                <Link to="/about">About Us</Link>
              </div>
            </div>
            <div>
              <p className="font-bold">Enquiries</p>
              <div className="mt-4 grid gap-3 text-sm text-primary-foreground/75">
                <Link to="/quote" search={{ product: "" }}>
                  Request a Quote
                </Link>
                <Link to="/contact">Contact & Locations</Link>
                <a href="tel:+97142858704" className="hover:text-primary-foreground">
                  +971 4 285 8704
                </a>
                <a href="tel:+971588236312" className="hover:text-primary-foreground">
                  +971 58 823 6312
                </a>
              </div>
            </div>
          </div>
          <p className="pt-6 text-xs text-primary-foreground/60">
            © 2026 Razeen Building Material Trading LLC. Catalogue content shown for demonstration.
          </p>
        </div>
      </footer>
      <a
        href="https://wa.me/971588236312"
        aria-label="Chat with Razeen on WhatsApp"
        className="fixed bottom-20 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:bottom-6"
      >
        <img
          src={`${import.meta.env.BASE_URL}whatsapp.webp`}
          alt=""
          aria-hidden="true"
          className="size-12 object-contain"
        />
      </a>
      {/* <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background p-2 md:hidden">
        <a
          href="tel:+97142858704"
          className="flex h-12 items-center justify-center gap-2 border-r border-border font-bold text-primary"
        >
          <Phone className="size-4" /> Call
        </a>
        <a
          href="https://wa.me/971588236312"
          className="flex h-12 items-center justify-center gap-2 font-bold text-primary"
        >
          <img src="/whatsapp.webp" alt="" aria-hidden="true" className="size-5 object-contain" />{" "}
          WhatsApp
        </a>
      </div> */}
    </div>
  );
}
