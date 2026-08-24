import { jsx as _jsx } from "react/jsx-runtime";
import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description:
  "Real estate development, architecture, construction, commercial development, interior coordination, project management, and investment partnerships.",
  path: "/services"
});

export default function ServicesPage() {
  return /*#__PURE__*/_jsx(ServicesPageContent, {});
}