/**
 * One-shot converter: strip TypeScript types and rename .ts/.tsx → .js/.jsx
 * Run: node scripts/convert-to-js.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const babel = require("@babel/core");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SKIP = new Set([
  "node_modules",
  ".next",
  ".git",
  "scripts",
  "server",
]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(entry.name) && !entry.name.endsWith(".d.ts")) {
      files.push(full);
    }
  }
  return files;
}

const files = walk(root);
console.log(`Converting ${files.length} TypeScript files...`);

for (const file of files) {
  const code = fs.readFileSync(file, "utf8");
  const isTsx = file.endsWith(".tsx");

  const result = babel.transformSync(code, {
    filename: file,
    presets: [
      ["@babel/preset-typescript", { ignoreExtensions: true }],
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
    plugins: isTsx ? ["@babel/plugin-syntax-jsx"] : [],
    retainLines: true,
    babelrc: false,
    configFile: false,
  });

  if (!result?.code) {
    console.error("Failed:", file);
    continue;
  }

  const outFile = file.replace(/\.tsx$/, ".jsx").replace(/\.ts$/, ".js");
  fs.writeFileSync(outFile, result.code, "utf8");
  if (outFile !== file) fs.unlinkSync(file);
  console.log("✓", path.relative(root, outFile));
}

console.log("Done.");
