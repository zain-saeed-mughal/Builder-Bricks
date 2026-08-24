import { statistics, teamMembers, timeline } from "@/data/content";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Counter } from "@/components/common/Counter";
import { MagneticLink } from "@/components/common/MagneticButton";
import { TextReveal } from "@/components/animations/TextReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "Builder Bricks builds with purpose, precision, and perspective—shaping residential and commercial spaces across Pakistan.",
  path: "/about"
});

const values = [
  {
    title: "Purpose",
    description:
      "Every project begins with why—how people will live, work, and gather in the spaces we create."
  },
  {
    title: "Precision",
    description:
      "Design intent is protected through disciplined planning, coordination, and craftsmanship on site."
  },
  {
    title: "Perspective",
    description:
      "We balance immediate needs with long-term value—for residents, partners, and the communities we serve."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="theme-dark section-pad pt-[calc(var(--header-height)+2rem)]">
        <div className="container-site">
          <ScrollReveal y={14}>
            <p className="label-caps mb-6 text-brick">About Builder Bricks</p>
          </ScrollReveal>
          <TextReveal
            as="h1"
            type="lines"
            className="font-display display-lg max-w-5xl whitespace-pre-line text-warm-ivory"
          >
            {"WE BUILD WITH PURPOSE,\nPRECISION, AND PERSPECTIVE."}
          </TextReveal>
          <ScrollReveal y={22} delay={0.1}>
            <p className="mt-8 max-w-2xl text-pretty text-lg text-concrete">
              Since {siteConfig.foundingYear}, Builder Bricks has developed
              residential and commercial environments where architecture, craft,
              and daily life align.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="theme-light section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Mission"
              title="Shape better ways of living"
              description="We develop spaces that feel intentional from the street to the smallest interior detail—built for durability, comfort, and community."
            />
          </div>
          <div>
            <SectionHeading
              light
              eyebrow="Vision"
              title="A practice rooted in place"
              description="Builder Bricks aims to be the development partner of choice for clients who value design integrity, transparent process, and lasting quality."
            />
            <ScrollReveal y={12} delay={0.1}>
              <p className="mt-4 text-sm text-obsidian/55">
                Sample mission and vision — replace with approved company
                language.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="theme-dark section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Values"
            title="What guides our work"
            align="center"
          />
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} y={28} delay={index * 0.08}>
                <li className="border border-warm-ivory/10 p-6 md:p-8">
                  <h3 className="font-display text-2xl">{value.title}</h3>
                  <p className="mt-4 text-concrete">{value.description}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-light section-pad">
        <div className="container-site">
          <SectionHeading
            light
            eyebrow="Timeline"
            title="Our journey"
            description="Illustrative milestones — replace with verified company history."
          />
          <ol className="mt-12 space-y-0">
            {timeline.map((event, index) => (
              <ScrollReveal key={event.id} y={24} delay={index * 0.05}>
                <li className="grid gap-4 border-t border-obsidian/10 py-8 md:grid-cols-[8rem_1fr]">
                  <p className="font-display text-3xl text-brick">{event.year}</p>
                  <div>
                    <h3 className="font-display text-2xl text-obsidian">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-obsidian/70">{event.description}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="theme-dark section-pad">
        <div className="container-site">
          <SectionHeading
            eyebrow="Team"
            title="People behind the work"
            description="Sample team profiles — replace with real leadership and staff."
          />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <li key={member.id}>
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                  <ImageReveal
                    src={member.image.src}
                    alt={member.image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="absolute inset-0 h-full w-full"
                    delay={index * 0.06}
                  />
                </div>
                <ScrollReveal y={16} delay={0.05}>
                  <h3 className="font-display mt-4 text-xl">{member.name}</h3>
                  <p className="label-caps mt-1">{member.role}</p>
                  <p className="mt-3 text-sm text-concrete">{member.bio}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-light section-pad">
        <div className="container-site">
          <SectionHeading
            light
            eyebrow="By the numbers"
            title="Impact at a glance"
            align="center"
          />
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat, index) => (
              <ScrollReveal
                key={stat.id}
                y={30}
                delay={index * 0.08}
                className="text-center"
              >
                <p className="font-display text-5xl text-obsidian md:text-6xl">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    className="text-obsidian"
                  />
                </p>
                <p className="label-caps mt-3">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-obsidian/55">
            Sample statistics — replace with verified company metrics.
          </p>
        </div>
      </section>

      <section className="theme-dark section-pad">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Sustainability"
              title="Building with restraint and responsibility"
              description="We prioritize efficient footprints, durable materials, landscape retention, and operational efficiency—reducing waste without compromising quality."
            />
            <ScrollReveal y={20} delay={0.1}>
              <ul className="mt-6 space-y-3 text-concrete">
                <li>Landscape-first site planning where possible</li>
                <li>
                  Material selections chosen for longevity and local context
                </li>
                <li>
                  Energy-conscious envelopes and passive design strategies
                </li>
                <li>
                  Long-term asset stewardship for partners and residents
                </li>
              </ul>
            </ScrollReveal>
            <p className="mt-4 text-sm text-concrete/80">
              Sample sustainability overview — expand with certified policies
              and project-specific data.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
            <ImageReveal
              src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=80"
              alt="Sustainable housing development among trees"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 h-full w-full"
              variant="clip"
            />
          </div>
        </div>
      </section>

      <section className="theme-light section-pad">
        <div className="container-site flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <ScrollReveal y={20}>
            <div>
              <h2 className="font-display text-3xl text-obsidian md:text-4xl">
                Ready to build together?
              </h2>
              <p className="mt-3 max-w-lg text-obsidian/70">
                Tell us about your site, timeline, and ambitions.
              </p>
            </div>
          </ScrollReveal>
          <MagneticLink href="/contact">Get in touch</MagneticLink>
        </div>
      </section>
    </>
  );
}
