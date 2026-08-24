import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Builder Bricks to discuss residential, commercial, or mixed-use development opportunities.",
  path: "/contact"
});

export default function ContactPage() {
  const fullAddress = [
    siteConfig.address.line1,
    siteConfig.address.line2,
    `${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
    siteConfig.address.country
  ].join("\n");

  return (
    <>
      <section className="theme-dark section-pad pt-[calc(var(--header-height)+2rem)]">
        <div className="container-site">
          <SectionHeading
            eyebrow="Contact"
            title="Start a conversation"
            description="Share your project details and our team will respond with clarity on scope, timeline, and next steps."
          />
        </div>
      </section>

      <section className="theme-light section-pad">
        <div className="container-site grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <ScrollReveal y={24}>
            <ContactForm />
          </ScrollReveal>

          <aside className="space-y-10">
            <ScrollReveal y={20} delay={0.05}>
              <div>
                <h2 className="label-caps mb-4 text-brick">Office</h2>
                <address className="whitespace-pre-line not-italic text-obsidian/80">
                  {fullAddress}
                </address>
              </div>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.1}>
              <div>
                <h2 className="label-caps mb-4 text-brick">Contact</h2>
                <p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-brick"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p className="mt-2">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="hover:text-brick"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.15}>
              <div>
                <h2 className="label-caps mb-4 text-brick">Hours</h2>
                <ul className="space-y-2">
                  {siteConfig.hours.map((slot) => (
                    <li
                      key={slot.days}
                      className="flex justify-between gap-4 border-b border-obsidian/10 py-2 text-sm"
                    >
                      <span>{slot.days}</span>
                      <span className="text-obsidian/70">{slot.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal y={20} delay={0.2}>
              <div>
                <h2 className="label-caps mb-4 text-brick">Location</h2>
                <div className="relative aspect-[4/3] overflow-hidden border border-obsidian/15 bg-obsidian/[0.03]">
                  <iframe
                    title={siteConfig.mapEmbedLabel}
                    src={siteConfig.mapEmbedUrl}
                    className="absolute inset-0 h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </>
  );
}
