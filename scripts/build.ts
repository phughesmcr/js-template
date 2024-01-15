import { build, emptyDir } from "https://deno.land/x/dnt@0.39.0/mod.ts";
import {
  PKG_AUTHOR,
  PKG_BUGS,
  PKG_DESCRIPTION,
  PKG_HOMEPAGE,
  PKG_KEYWORDS,
  PKG_LICENSE,
  PKG_NAME,
  PKG_REPOSITORY,
  PKG_VERSION,
} from "../src/constants.ts";

await emptyDir("./dist/esm");

await build({
  entryPoints: ["./mod.ts"],
  importMap: "./deno.json",
  outDir: "./dist/esm",
  shims: {
    deno: true,
  },
  package: {
    "name": PKG_NAME,
    "version": PKG_VERSION,
    "description": PKG_DESCRIPTION,
    "author": PKG_AUTHOR,
    "license": PKG_LICENSE,
    "keywords": PKG_KEYWORDS,
    "bugs": PKG_BUGS,
    "homepage": PKG_HOMEPAGE,
    "repository": PKG_REPOSITORY,
  },
  typeCheck: "both",
  rootTestDir: "./test",
  skipSourceOutput: true,
  scriptModule: false,
  test: false,
  compilerOptions: {
    lib: ["ES2022"],
    target: "ES2022",
    skipLibCheck: true,
    sourceMap: true,
  },
  declaration: "inline",
  postBuild() {
    Deno.copyFileSync("AUTHORS", "dist/esm/AUTHORS");
    Deno.copyFileSync("CONTRIBUTORS", "dist/esm/CONTRIBUTORS");
    Deno.copyFileSync("LICENSE", "dist/esm/LICENSE");
    Deno.copyFileSync("README.md", "dist/esm/README.md");
    Deno.copyFileSync("SECURITY.md", "dist/esm/SECURITY.md");
    Deno.copyFileSync("SUPPORT.md", "dist/esm/SUPPORT.md");
  },
});

/* await emptyDir("./dist/cjs");

await build({
  entryPoints: ["./mod.ts"],
  importMap: "./deno.json",
  outDir: "./dist/cjs",
  shims: {
    deno: true,
    weakRef: true,
  },
  package: {
    "name": PKG_NAME,
    "version": PKG_VERSION,
    "description": PKG_DESCRIPTION,
    "author": PKG_AUTHOR,
    "license": PKG_LICENSE,
    "keywords": PKG_KEYWORDS,
    "bugs": PKG_BUGS,
    "homepage": PKG_HOMEPAGE,
    "repository": PKG_REPOSITORY,
  },
  typeCheck: "both",
  rootTestDir: "./test",
  skipSourceOutput: true,
  compilerOptions: {
    lib: ["ES6"],
    target: "ES2015",
    skipLibCheck: true,
    sourceMap: true,
  },
  declaration: "inline",
  postBuild() {
    Deno.copyFileSync("AUTHORS", "dist/cjs/AUTHORS");
    Deno.copyFileSync("CONTRIBUTORS", "dist/cjs/CONTRIBUTORS");
    Deno.copyFileSync("LICENSE", "dist/cjs/LICENSE");
    Deno.copyFileSync("README.md", "dist/cjs/README.md");
    Deno.copyFileSync("SECURITY.md", "dist/cjs/SECURITY.md");
    Deno.copyFileSync("SUPPORT.md", "dist/cjs/SUPPORT.md");
  },
});
 */
