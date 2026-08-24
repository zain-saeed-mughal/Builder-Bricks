

/**
 * SAMPLE CONTENT — Replace with real company details before production launch.
 * Keep all brand/contact values here so components stay free of hardcoded copy.
 */
export const siteConfig = {
  name: "Builder Bricks",
  legalName: "Builder Bricks Developments",
  tagline: "WE DON'T JUST BUILD.\nWE SHAPE HOW YOU LIVE.",
  shortDescription:
  "Builder Bricks creates thoughtful residential and commercial spaces where architecture, craftsmanship, and modern living come together.",
  description:
  "Builder Bricks develops thoughtful residential and commercial spaces shaped by modern architecture, lasting craftsmanship, and better ways of living.",
  url: "https://builderbricks.example", // Replace with production domain
  locale: "en_PK",
  foundingYear: 2007, // Sample value
  email: "hello@builderbricks.example", // Replace with real email
  phone: "+92 300 000 0000", // Replace with real phone
  phoneDisplay: "+92 300 000 0000",
  address: {
    line1: "12 Architecture Avenue",
    line2: "Gulberg III",
    city: "Lahore",
    region: "Punjab",
    postalCode: "54000",
    country: "Pakistan"
  },
  hours: [
  { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
  { days: "Saturday", time: "10:00 AM – 2:00 PM" },
  { days: "Sunday", time: "Closed" }],

  primaryCta: { label: "Explore Our Projects", href: "/projects" },
  secondaryCta: { label: "Start Your Project", href: "/contact" },
  mapEmbedLabel: "Builder Bricks office location — Gulberg III, Lahore",
  // Dummy embed for development — replace with a real Maps/Mapbox embed for production.
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Gulberg+III,+Lahore,+Pakistan&z=15&output=embed",
  /**
   * Hero buildings video.
   * Prefer a local file at /public/videos/hero-buildings.mp4 for production.
   * fallbackSrc streams a free architecture clip if the local file is missing.
   */
  heroVideo: {
    // Local modern residence exterior — 1920×1080 HD.
    // Query bumps cache so browsers don't keep an older mp4 under the same path.
    src: "/videos/hero-buildings.mp4?v=hd1080",
    fallbackSrc:
      "https://videos.pexels.com/video-files/17224715/17224715-hd_1920_1080_30fps.mp4",
    // First frame extracted from the same HD clip (not a different Unsplash still).
    poster: "/videos/hero-poster.jpg"
  }
};

export const navigation = [
{ href: "/", label: "Home" },
{ href: "/projects", label: "Projects" },
{ href: "/services", label: "Services" },
{ href: "/about", label: "About" },
{ href: "/contact", label: "Contact Us" }];


export const footerNav = [
...navigation,
{ href: "/privacy", label: "Privacy" }];


export const socialLinks = [
// Replace placeholder URLs with real social profiles
{ label: "Instagram", href: "https://instagram.com/builderbricks" },
{ label: "LinkedIn", href: "https://linkedin.com/company/builderbricks" },
{ label: "X", href: "https://x.com/builderbricks" }];


export const seoDefaults = {
  title: "Builder Bricks | Modern Real Estate Development",
  titleTemplate: "%s | Builder Bricks",
  description: siteConfig.description,
  ogImage: "/images/og-default.svg"
};

export const processSteps = [
{
  number: "01",
  title: "Discover",
  description:
  "We study the site, lifestyle needs, and long-term ambitions before a single line is drawn."
},
{
  number: "02",
  title: "Design",
  description:
  "Architecture, materials, and spatial flow are refined into a clear, buildable vision."
},
{
  number: "03",
  title: "Develop",
  description:
  "Construction is coordinated with precision so craftsmanship matches the design intent."
},
{
  number: "04",
  title: "Deliver",
  description:
  "Spaces are handed over carefully—tested, finished, and ready for daily life."
}];


export const philosophyItems = [
{
  title: "Thoughtful Design",
  description:
  "Every plan begins with how people move, gather, rest, and grow inside a space."
},
{
  title: "Lasting Craftsmanship",
  description:
  "Materials and detailing are chosen for durability, tactility, and quiet elegance."
},
{
  title: "Responsible Development",
  description:
  "We build with efficiency, longevity, and community impact in mind—not short-term spectacle."
}];

/** Atmosphere strip labels — used in homepage visual marquee only. */
export const atmosphereLabels = [
  "Residences",
  "Mixed Use",
  "Workspaces",
  "Courtyards",
  "Facades",
  "Landscapes"
];