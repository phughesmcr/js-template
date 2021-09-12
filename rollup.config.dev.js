"use strict";

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import * as pkg from "./package.json";

const extensions = [...DEFAULT_EXTENSIONS, ".ts", ".tsx"];
const external = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];
const globals = {};

const input = "./src/index.ts";

export default [
  {
    input,

    external,

    plugins: [
      // Allows node_modules resolution
      nodeResolve({
        extensions,
        mainFields: ["module", "main"],
      }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs({
        include: "node_modules/**",
        transformMixedEsModules: true,
       }),

      // Compile TypeScript/JavaScript files
      typescript({
        exclude: [ "node_modules", "*.d.ts", "**/*.d.ts" ],
        include: [ "*.ts+(|x)", "**/*.ts+(|x)", "*.m?js+(|x)", "**/*.m?js+(|x)" ],
        module: "ES2020",
        tsconfig: "tsconfig.dev.json",
        tslib: require("tslib"),
        typescript: require("typescript"),
      }),

      babel({
        extensions,
        babelHelpers: "bundled",
        include: ["src/**/*"],
        exclude: ["node_modules/**/*"],
      }),
    ],

    output: {
      esModule: true,
      exports: "named",
      file: "./dist/esm/index.min.js",
      format: "es",
      globals,
    },
  },
  // TYPESCRIPT DECLARATIONS
  {
    input: "./types/index.d.ts",
    output: [
      {
        file: "./dist/esm/index.min.d.ts",
        format: "es"
      },
    ],
    plugins: [
      dts(),
    ],
  },
];
