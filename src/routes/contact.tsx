import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageIntro, QuoteForm } from "@/components/catalogue-ui";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Locations | Razeen UAE" },
      {
        name: "description",
        content:
          "Contact Razeen about building materials, tools, project requirements and UAE supply enquiries.",
      },
      { property: "og:title", content: "Contact & Locations | Razeen UAE" },
      {
        property: "og:description",
        content: "Start a product or project supply enquiry with Razeen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const contactDetails = [
  { icon: Phone, label: "Telephone", value: "+971 4 285 8704", href: "tel:+97142858704" },
  {
    icon: null,
    whatsapp: true,
    label: "Mobile / WhatsApp",
    value: "+971 58 823 6312",
    href: "https://wa.me/971588236312",
  },
  { icon: Mail, label: "Email", value: "rbmsale@gmail.com", href: "mailto:rbmsale@gmail.com" },
  { icon: MapPin, label: "Address", value: "Umm Ramool, Rashidiya, Dubai, UAE" },
  { icon: MapPin, label: "PO Box", value: "76806" },
  { icon: Clock, label: "Working hours", value: "Please contact us for availability" },
];

function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let’s discuss your requirement"
        copy="Reach Razeen Building Materials Trading LLC for product, project and supply enquiries across the UAE."
      />
      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <aside>
            <h2 className="text-2xl font-bold text-primary">Contact details</h2>
            <div className="mt-6 grid gap-4">
              {contactDetails.map(({ icon: Icon, whatsapp, label, value, href }) => (
                <div key={label} className="flex gap-4 border-b border-border py-4 items-center">
                  {whatsapp ? (
                    <img
                      src="/whatsapp.webp"
                      alt=""
                      aria-hidden="true"
                      className="size-8 shrink-0 object-contain"
                    />
                  ) : (
                    Icon && <Icon className="size-5 shrink-0 text-primary-light" />
                  )}
                  <div>
                    <p className="text-sm font-bold">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-sm text-muted-foreground hover:text-primary-light"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/quote" search={{ product: "" }}>
                Open full quote form
              </Link>
            </Button>
          </aside>
          <div className="rounded-xl border border-border p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary">Send an enquiry</h2>
            <p className="mb-7 mt-2 text-sm text-muted-foreground">
              Required fields are marked with an asterisk.
            </p>
            <QuoteForm compact />
          </div>
        </div>
        <div className="site-container mt-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase text-primary-light">Find us</p>
              <h2 className="mt-2 text-2xl font-bold text-primary">
                Razeen Building Materials Trading LLC
              </h2>
            </div>
            <a
              href="https://maps.app.goo.gl/8AQdLTX7MQZjU57z6"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-primary-light hover:text-primary"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <iframe
              title="Razeen Building Materials Trading LLC on Google Maps"
              src="https://www.google.com/maps?q=Razeen%20Building%20Materials%20Trading%20LLC%2C%20Umm%20Ramool%2C%20Dubai&output=embed"
              className="h-80 w-full border-0 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
