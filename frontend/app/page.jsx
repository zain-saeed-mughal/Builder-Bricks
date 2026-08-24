import { jsx as _jsx } from "react/jsx-runtime";

import { HomePage } from "@/components/sections/HomePage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Builder Bricks | Modern Real Estate Development",
  path: "/"
});

export default function Home() {
  return /*#__PURE__*/_jsx(HomePage, {});
}