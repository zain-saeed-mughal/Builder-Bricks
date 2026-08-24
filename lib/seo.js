
import { seoDefaults, siteConfig } from "@/data/site";

const baseUrl = siteConfig.url;

export function createMetadata({
  title,
  description = seoDefaults.description,
  path = "/",
  image = seoDefaults.ogImage,
  noIndex = false






} = {}) {
  const fullTitle = title ?
  title.includes("Builder Bricks") ?
  title :
  `${title} | Builder Bricks` :
  seoDefaults.title;
  const url = `${baseUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: fullTitle }]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl]
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country
    }
  };
}

export function breadcrumbJsonLd(
items)
{
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`
    }))
  };
}

export function projectJsonLd(project)





{
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.shortDescription,
    url: `${siteConfig.url}/projects/${project.slug}`,
    image: project.coverImage.src,
    creator: {
      "@type": "Organization",
      name: siteConfig.name
    },
    contentLocation: {
      "@type": "Place",
      name: project.city
    }
  };
}