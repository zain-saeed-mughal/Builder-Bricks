

/**
 * IMAGE STRATEGY
 * All gallery/cover URLs below are high-quality architectural placeholders
 * from images.unsplash.com. Replace with local production assets under
 * /public/images/projects/{slug}/ and update paths accordingly.
 * Keep width/height accurate for next/image layout stability.
 */

const img = (
id,
alt,
width = 1200,
height = 800) => (
{
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`,
  alt,
  width,
  height
});

export const projects = [
{
  slug: "brickline-residences",
  title: "Brickline Residences",
  category: "Residential",
  city: "Lahore",
  status: "Completed",
  year: 2024,
  featured: true,
  shortDescription:
  "A vertical residential community defined by warm brick modules, generous terraces, and calm interior courtyards.",
  overview:
  "Brickline Residences reimagines urban living with stacked brick volumes, shared gardens, and apartments designed for light, privacy, and daily ease.",
  designConcept:
  "The tower reads as an assembly of modular brick units—each balcony a measured offset that creates rhythm across the elevation while shading interiors.",
  quote:
  "Architecture should feel assembled with intention—brick by brick, life by life.",
  client: "Sample Client Partnership", // Sample content
  area: "285,000 sq ft",
  amenities: [
  "Sky lounge",
  "Courtyard gardens",
  "Fitness studio",
  "Concierge lobby",
  "Secure parking",
  "Children’s play court"],

  keyFacts: [
  { label: "Typology", value: "Luxury Apartments" },
  { label: "Units", value: "148" },
  { label: "Floors", value: "22" },
  { label: "Completion", value: "2024" }],

  coverImage: img(
    "photo-1486406146926-c627a92ad1ab",
    "Brickline Residences exterior tower facade at dusk"
  ),
  gallery: [
  img("photo-1486406146926-c627a92ad1ab", "Brickline Residences main elevation"),
  img("photo-1600596542815-ffad4c1539a9", "Brickline Residences living room with natural light"),
  img("photo-1600607687939-ce8a6c25118c", "Brickline Residences kitchen and dining space"),
  img("photo-1600585154340-be6161a56a0c", "Brickline Residences terrace overlooking the city"),
  img("photo-1600566753190-17f0baa2a6c3", "Brickline Residences lobby with warm materials")]

},
{
  slug: "the-terraces",
  title: "The Terraces",
  category: "Mixed Use",
  city: "Islamabad",
  status: "Under Development",
  year: 2026,
  featured: true,
  shortDescription:
  "A hillside mixed-use destination weaving residences, retail, and landscape terraces into one continuous experience.",
  overview:
  "The Terraces steps with the topography, creating layered plazas, cafés, and homes that open toward the Margalla backdrop.",
  designConcept:
  "Cascading platforms form a civic spine—retail activates the lower levels while residences rise above planted terraces.",
  quote: "A city should climb with the land, not flatten it.",
  client: "Sample Development Group",
  area: "410,000 sq ft",
  amenities: [
  "Retail promenade",
  "Roof gardens",
  "Co-working loft",
  "Community hall",
  "Outdoor amphitheater",
  "EV parking"],

  keyFacts: [
  { label: "Typology", value: "Mixed-Use" },
  { label: "Phases", value: "3" },
  { label: "Retail", value: "42 units" },
  { label: "Target", value: "2026" }],

  coverImage: img(
    "photo-1545324418-cc1a3fa10c00",
    "The Terraces mixed-use development exterior"
  ),
  gallery: [
  img("photo-1545324418-cc1a3fa10c00", "The Terraces building massing"),
  img("photo-1493809842364-78817add7ffb", "The Terraces interior retail corridor"),
  img("photo-1502672260266-1c1ef2d93688", "The Terraces residential living space"),
  img("photo-1560448204-e02f11c3d0e2", "The Terraces landscaped plaza"),
  img("photo-1512917774080-9991f1c4c750", "The Terraces evening facade lighting")]

},
{
  slug: "courtyard-villas",
  title: "Courtyard Villas",
  category: "Residential",
  city: "Karachi",
  status: "Completed",
  year: 2023,
  featured: true,
  shortDescription:
  "A quiet enclave of villas organized around private courtyards, shaded walkways, and coastal breeze corridors.",
  overview:
  "Courtyard Villas balances privacy and community through inward gardens, thick masonry walls, and open-air living rooms.",
  designConcept:
  "Each villa wraps a central court—daylight filtered through brick screens, rooms arranged for climate comfort.",
  quote: "The courtyard is the heart of the house—and of daily ritual.",
  client: "Sample Private Collective",
  area: "96,000 sq ft",
  amenities: [
  "Private courtyards",
  "Clubhouse",
  "Pool pavilion",
  "Walking lanes",
  "Guest suites",
  "Landscape buffers"],

  keyFacts: [
  { label: "Typology", value: "Residential Villas" },
  { label: "Homes", value: "24" },
  { label: "Plot sizes", value: "450–720 sq yd" },
  { label: "Completion", value: "2023" }],

  coverImage: img(
    "photo-1613490493576-7fde63acd811",
    "Courtyard Villas modern villa exterior"
  ),
  gallery: [
  img("photo-1613490493576-7fde63acd811", "Courtyard Villas street elevation"),
  img("photo-1600210492493-0946911123ea", "Courtyard Villas open living room"),
  img("photo-1600210492486-724fe5c67fb0", "Courtyard Villas bedroom with soft light"),
  img("photo-1600573472592-401b489a3cdc", "Courtyard Villas pool and garden"),
  img("photo-1600566752355-35792bedcfea", "Courtyard Villas kitchen detail")]

},
{
  slug: "north-square",
  title: "North Square",
  category: "Commercial",
  city: "Lahore",
  status: "Completed",
  year: 2022,
  featured: true,
  shortDescription:
  "A commercial square that frames public space with precise concrete lines and active ground-floor frontage.",
  overview:
  "North Square anchors a northern district with flexible office plates, street-facing retail, and a civic plaza.",
  designConcept:
  "A clear grid organizes the massing; deep reveals and brick infill soften the commercial scale at pedestrian level.",
  quote: "Commerce thrives where the street feels intentional.",
  client: "Sample Commercial Trust",
  area: "320,000 sq ft",
  amenities: [
  "Public plaza",
  "Flexible office floors",
  "Ground retail",
  "Conference center",
  "Cafe terrace",
  "Secure access"],

  keyFacts: [
  { label: "Typology", value: "Commercial" },
  { label: "Offices", value: "18 floors" },
  { label: "Plaza", value: "1.2 acres" },
  { label: "Completion", value: "2022" }],

  coverImage: img(
    "photo-1486325212027-8081e485255e",
    "North Square commercial building exterior"
  ),
  gallery: [
  img("photo-1486325212027-8081e485255e", "North Square facade grid"),
  img("photo-1497366216548-37526070297c", "North Square open office interior"),
  img("photo-1497366811353-6870744d04b2", "North Square meeting lounge"),
  img("photo-1497215728101-856f4ea42174", "North Square workspace daylight"),
  img("photo-1464938050520-ef2270bb8ce8", "North Square plaza at dusk")]

},
{
  slug: "the-grove",
  title: "The Grove",
  category: "Residential",
  city: "Rawalpindi",
  status: "Under Development",
  year: 2027,
  featured: true,
  shortDescription:
  "Sustainable housing arranged among retained trees, porous streets, and low-rise brick clusters.",
  overview:
  "The Grove prioritizes landscape first—homes nestle between existing trees with shared gardens and efficient footprints.",
  designConcept:
  "Clusters rotate around green courts; brick and timber screens manage heat while keeping a human neighborhood scale.",
  quote: "Sustainability begins with what we choose not to erase.",
  client: "Sample Housing Initiative",
  area: "175,000 sq ft",
  amenities: [
  "Shared orchards",
  "Rain gardens",
  "Bike lanes",
  "Community kitchen",
  "Solar-ready roofs",
  "Nature play areas"],

  keyFacts: [
  { label: "Typology", value: "Sustainable Housing" },
  { label: "Homes", value: "86" },
  { label: "Green cover", value: "42%" },
  { label: "Target", value: "2027" }],

  coverImage: img(
    "photo-1605276374104-dee2a0ed3cd6",
    "The Grove sustainable housing nestled in greenery"
  ),
  gallery: [
  img("photo-1605276374104-dee2a0ed3cd6", "The Grove housing cluster"),
  img("photo-1600585154526-990dced4db0d", "The Grove interior with garden view"),
  img("photo-1600607687644-c7171b42498f", "The Grove kitchen opening to patio"),
  img("photo-1600566752355-35792bedcfea", "The Grove shared landscape path"),
  img("photo-1600210491892-03d54c0aaf87", "The Grove bedroom with soft daylight")]

},
{
  slug: "brick-one",
  title: "Brick One",
  category: "Offices",
  city: "Islamabad",
  status: "Completed",
  year: 2025,
  featured: true,
  shortDescription:
  "A contemporary office campus with tactile brick cores, flexible floorplates, and calm collaborative atriums.",
  overview:
  "Brick One offers modern workplaces calibrated for focus and collaboration—materially warm, operationally efficient.",
  designConcept:
  "A brick spine anchors glass floorplates; atriums bring vertical light and informal meeting landscapes.",
  quote: "Workplaces should feel grounded, not generic.",
  client: "Sample Enterprise Tenant",
  area: "210,000 sq ft",
  amenities: [
  "Atrium lounge",
  "Focus suites",
  "Rooftop terrace",
  "Wellness room",
  "Cafe court",
  "End-of-trip facilities"],

  keyFacts: [
  { label: "Typology", value: "Contemporary Offices" },
  { label: "Floors", value: "14" },
  { label: "Workstations", value: "1,200+" },
  { label: "Completion", value: "2025" }],

  coverImage: img(
    "photo-1497366216548-37526070297c",
    "Brick One contemporary office building exterior"
  ),
  gallery: [
  img("photo-1497366216548-37526070297c", "Brick One exterior facade"),
  img("photo-1556761175-b413da4baf72", "Brick One collaborative workspace"),
  img("photo-1497366754035-f200968a6e72", "Brick One glass-walled meeting room"),
  img("photo-1524758631624-e2822e304c36", "Brick One lounge seating"),
  img("photo-1497366811353-6870744d04b2", "Brick One atrium with natural light")]

}];


export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug)


{
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: projects[index - 1] ?? projects[projects.length - 1] ?? null,
    next: projects[index + 1] ?? projects[0] ?? null
  };
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export const projectCities = [
...new Set(projects.map((project) => project.city))].
sort();

export const projectCategories = [
...new Set(projects.map((project) => project.category))].
sort();

export const projectStatuses = [
...new Set(projects.map((project) => project.status))].
sort();