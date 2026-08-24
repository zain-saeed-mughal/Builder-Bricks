/**
 * Fix babel jsxDEV output → production jsx/jsxs runtime calls
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import * as parser from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";

const traverse = _traverse.default || _traverse;
const generate = _generate.default || _generate;
const require = createRequire(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

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

function fixFile(file) {
  let code = fs.readFileSync(file, "utf8");
  if (!code.includes("jsx-dev-runtime") && !code.includes("jsxDEV")) {
    return false;
  }

  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let usedJsx = false;
  let usedJsxs = false;
  let usedFragment = false;

  traverse(ast, {
    ImportDeclaration(path) {
      if (path.node.source.value === "react/jsx-dev-runtime") {
        path.remove();
      }
    },
    CallExpression(path) {
      const callee = path.node.callee;
      if (!t.isIdentifier(callee)) return;
      if (callee.name !== "_jsxDEV" && callee.name !== "jsxDEV") return;

      const args = path.node.arguments;
      const type = args[0];
      const props = args[1];
      const key = args[2] && !t.isNullLiteral(args[2]) && !(t.isUnaryExpression(args[2]) && args[2].operator === "void")
        ? args[2]
        : null;

      let isStaticChildren = false;
      if (args[3] && t.isBooleanLiteral(args[3])) {
        isStaticChildren = args[3].value;
      } else if (t.isObjectExpression(props)) {
        const childrenProp = props.properties.find(
          (p) =>
            t.isObjectProperty(p) &&
            t.isIdentifier(p.key, { name: "children" }),
        );
        if (childrenProp && t.isArrayExpression(childrenProp.value)) {
          isStaticChildren = true;
        }
      }

      if (t.isIdentifier(type, { name: "_Fragment" }) || t.isIdentifier(type, { name: "Fragment" })) {
        usedFragment = true;
      }

      const newArgs = [type, props];
      if (key && !(t.isUnaryExpression(key) && key.operator === "void")) {
        newArgs.push(key);
      }

      if (isStaticChildren) {
        usedJsxs = true;
        path.node.callee = t.identifier("_jsxs");
      } else {
        usedJsx = true;
        path.node.callee = t.identifier("_jsx");
      }
      path.node.arguments = newArgs;
    },
  });

  const imports = [];
  if (usedJsx) imports.push("jsx as _jsx");
  if (usedJsxs) imports.push("jsxs as _jsxs");
  if (usedFragment) imports.push("Fragment as _Fragment");

  const { code: out } = generate(ast, { retainLines: true, compact: false });

  let finalCode = out;
  if (imports.length) {
    finalCode =
      `import { ${imports.join(", ")} } from "react/jsx-runtime";\n` + finalCode;
  }

  // Fix mojibake en-dashes in budget strings
  finalCode = finalCode.replace(/\$250k \uFFFD\?\" \$1M/g, "$250k – $1M");
  finalCode = finalCode.replace(/\$1M \uFFFD\?\" \$5M/g, "$1M – $5M");
  finalCode = finalCode.replace(/\$5M \uFFFD\?\" \$15M/g, "$5M – $15M");
  finalCode = finalCode.replace(/\$250k �\?" \$1M/g, "$250k – $1M");
  finalCode = finalCode.replace(/\$1M �\?" \$5M/g, "$1M – $5M");
  finalCode = finalCode.replace(/\$5M �\?" \$15M/g, "$5M – $15M");

  fs.writeFileSync(file, finalCode, "utf8");
  return true;
}

// Ensure babel packages for traverse/generator/types/parser
const files = walk(root).filter((f) => !f.includes(`${path.sep}backend${path.sep}`));
let count = 0;
for (const file of files) {
  try {
    if (fixFile(file)) {
      count += 1;
      console.log("fixed", path.relative(root, file));
    }
  } catch (err) {
    console.error("FAIL", file, err.message);
  }
}
console.log(`Fixed ${count} files`);
