
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function sitemap() {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
  "",
  "/projects",
  "/services",
  "/about",
  "/contact",
  "/privacy"].
  map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticRoutes, ...projectRoutes];
}