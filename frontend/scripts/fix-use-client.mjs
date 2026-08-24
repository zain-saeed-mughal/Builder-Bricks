import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKIP = new Set(["node_modules", ".next", ".git", "scripts", "backend"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.jsx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

for (const file of walk(root)) {
  let code = fs.readFileSync(file, "utf8");
  if (!code.includes('"use client"') && !code.includes("'use client'")) continue;

  // Remove all use client directives
  code = code.replace(/^["']use client["'];?\s*/gm, "");

  // Ensure first line is use client
  code = `"use client";\n\n${code.trimStart()}`;
  fs.writeFileSync(file, code, "utf8");
  console.log("fixed directive", path.relative(root, file));
}
