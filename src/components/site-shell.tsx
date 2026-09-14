import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone, Search, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/products" as const, label: "Products" },
  { to: "/brands" as const, label: "Brands" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

export function BrandMark() {
  return <Link to="/" aria-label="Razeen home" className="flex shrink-0 items-center gap-3"><span className="grid size-10 place-items-center rounded-lg bg-accent font-extrabold text-primary">R</span><span className="leading-none"><strong className="block text-xl font-extrabold text-primary">RAZEEN</strong><span className="mt-1 block text-[9px] font-semibold uppercase text-muted-foreground">Building Materials</span></span></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex">
        <BrandMark />
        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map((item) => <Link key={item.to} to={item.to} className="text-sm font-semibold text-foreground transition-colors hover:text-primary-light" activeProps={{ className: "text-primary-light" }}>{item.label}</Link>)}
          <Link to="/products" search={{ q: "" }} aria-label="Search products" className="grid size-11 place-items-center rounded-lg text-primary hover:bg-secondary"><Search className="size-5" /></Link>
          <Button asChild><Link to="/quote">Request a Quote</Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="border-t border-border bg-background px-4 py-5 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto flex max-w-lg flex-col gap-1">{nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 font-semibold hover:bg-secondary">{item.label}</Link>)}<Button asChild className="mt-3"><Link to="/quote" onClick={() => setOpen(false)}>Request a Quote</Link></Button></div></nav>}
    </header>
    <main>{children}</main>
    <footer className="bg-primary pb-20 text-primary-foreground md:pb-0"><div className="site-container py-14"><div className="grid gap-10 border-b border-primary-foreground/20 pb-10 md:grid-cols-4"><div className="md:col-span-2"><p className="text-2xl font-extrabold">RAZEEN</p><p className="mt-4 max-w-md text-sm leading-6 text-primary-foreground/75">Building materials, tools and supply solutions for construction, repair and maintenance across the UAE.</p></div><div><p className="font-bold">Explore</p><div className="mt-4 grid gap-3 text-sm text-primary-foreground/75"><Link to="/products">Products</Link><Link to="/brands">Brands</Link><Link to="/about">About Us</Link></div></div><div><p className="font-bold">Enquiries</p><div className="mt-4 grid gap-3 text-sm text-primary-foreground/75"><Link to="/quote">Request a Quote</Link><Link to="/contact">Contact & Locations</Link></div></div></div><p className="pt-6 text-xs text-primary-foreground/60">© 2026 Razeen Building Material Trading LLC. Catalogue content shown for demonstration.</p></div></footer>
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background p-2 md:hidden"><a href="tel:+971000000000" className="flex h-12 items-center justify-center gap-2 border-r border-border font-bold text-primary"><Phone className="size-4" /> Call</a><a href="https://wa.me/971000000000" className="flex h-12 items-center justify-center gap-2 font-bold text-primary"><MessageCircle className="size-4" /> WhatsApp</a></div>
  </div>;
}