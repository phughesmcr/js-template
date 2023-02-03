import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

const CURRENT_YEAR = new Date().getFullYear();
const PACKAGE_NAME = process.env.npm_package_name;
const PACKAGE_VERSION = process.env.npm_package_version;
const PACKAGE_LICENSE = process.env.npm_package_license;
const AUTHOR_NAME = "Peter Hughes";
const AUTHOR_EMAIL = "github@phugh.es";
const AUTHOR_URL = "https://www.phugh.es"

const BANNER = `/*! ${PACKAGE_NAME} v${PACKAGE_VERSION}. ${PACKAGE_LICENSE} license. (C) ${CURRENT_YEAR} ${AUTHOR_NAME}<${AUTHOR_EMAIL}>(${AUTHOR_URL}). All rights reserved. **/\n`;
const EXTENSIONS = [...DEFAULT_EXTENSIONS, ".ts", ".tsx"];
const EXTERNALS = {}; // list package.dependencies & package.peerDependencies here.
const GLOBALS = {};
const INPUT = "./src/index.ts";

export default [
  // ESM
  {
    input: INPUT,

    external: EXTERNALS,

    plugins: [
      replace({
        exclude: 'node_modules/**',
        values: {
          __VERSION__: PACKAGE_VERSION,
        },
        preventAssignment: true,
      }),

      nodeResolve({
        extensions: EXTENSIONS,
        mainFields: ["jsnext:main", "module", "main"],
        skip: EXTERNALS,
      }),

      commonjs({
        include: "node_modules/**",
        transformMixedEsModules: true,
      }),

      json({
        compact: true,
        preferConst: true,
      }),

      typescript({
        clean: true,
        exclude: [ "node_modules", "*.d.ts", "**/*.d.ts" ],
        include: [ "*.ts+(|x)", "**/*.ts+(|x)", "*.m?js+(|x)", "**/*.m?js+(|x)" ],
        tsconfig: "tsconfig.json",
        tsconfigOverride: {
          declaration: false,
        },
        useTsconfigDeclarationDir: true,
      }),

      babel({
        envName: "esm",
        extensions: EXTENSIONS,
        babelHelpers: "bundled",
        include: ["src/**/*"],
        exclude: ["node_modules/**/*"],
      }),

      terser({
        safari10: true,
        ecma: 2021,
        module: true,
        compress: true,
        mangle: true,
      }),
    ],

    output: [{
      banner: BANNER,
      esModule: true,
      exports: "named",
      file: "./dist/esm/index.min.js",
      format: "es",
      sourcemap: true,
      globals: GLOBALS,
    }],
  },

  // CJS
  {
    input: INPUT,

    external: EXTERNALS,

    plugins: [
      replace({
        exclude: 'node_modules/**',
        values: {
          __VERSION__: PACKAGE_VERSION,
        },
        preventAssignment: true,
      }),

      nodeResolve({
        extensions: EXTENSIONS,
        mainFields: ["node", "main", "module"],
        skip: EXTERNALS,
      }),

      commonjs({
        include: "node_modules/**",
        transformMixedEsModules: true,
      }),

      json({
        compact: true,
        preferConst: true,
      }),

      typescript({
        clean: true,
        exclude: [ "node_modules", "*.d.ts", "**/*.d.ts" ],
        include: [ "*.ts+(|x)", "**/*.ts+(|x)", "*.m?js+(|x)", "**/*.m?js+(|x)" ],
        tsconfig: "tsconfig.json",
        tsconfigOverride: {
          declaration: false,
        },
        useTsconfigDeclarationDir: true,
      }),

      babel({
        envName: "cjs",
        extensions: EXTENSIONS,
        babelHelpers: "bundled",
        include: ["src/**/*"],
        exclude: ["node_modules/**/*"],
      }),

      terser({
        ecma: 2021,
        compress: true,
        mangle: true,
      }),
    ],

    output: {
      banner: BANNER,
      esModule: false,
      exports: "named",
      file: "./dist/cjs/index.min.js",
      format: "cjs",
      name: PACKAGE_NAME,
      sourcemap: true,
      globals: GLOBALS,
    },
  },

  // UMD & IIFE
  {
    input: INPUT,

    external: EXTERNALS,

    plugins: [
      replace({
        exclude: 'node_modules/**',
        values: {
          __VERSION__: PACKAGE_VERSION,
        },
        preventAssignment: true,
      }),

      nodeResolve({
        extensions: EXTENSIONS,
        mainFields: ["browser", "main", "module"],
        browser: true,
        skip: EXTERNALS,
      }),

      commonjs({
        include: "node_modules/**",
        transformMixedEsModules: true,
      }),

      json({
        compact: true,
        preferConst: true,
      }),

      typescript({
        clean: true,
        exclude: [ "node_modules", "*.d.ts", "**/*.d.ts" ],
        include: [ "*.ts+(|x)", "**/*.ts+(|x)", "*.m?js+(|x)", "**/*.m?js+(|x)" ],
        tsconfig: "tsconfig.json",
        tsconfigOverride: {
          declaration: false,
        },
        useTsconfigDeclarationDir: true,
      }),

      babel({
        envName: "umd",
        extensions: EXTENSIONS,
        babelHelpers: "bundled",
        include: ["src/**/*"],
        exclude: ["node_modules/**/*"],
      }),

      terser({
        ecma: 5,
        safari10: true,
        compress: true,
        mangle: true,
      }),
    ],

    output: {
      banner: BANNER,
      esModule: false,
      exports: "named",
      file: "./dist/umd/index.min.js",
      format: "umd",
      name: PACKAGE_NAME,
      noConflict: true,
      sourcemap: true,
      globals: GLOBALS,
    }
  },

  // IIFE
  {
    input: INPUT,

    external: EXTERNALS,

    plugins: [
      replace({
        exclude: 'node_modules/**',
        values: {
          __VERSION__: PACKAGE_VERSION,
        },
        preventAssignment: true,
      }),

      nodeResolve({
        extensions: EXTENSIONS,
        mainFields: ["browser", "main", "module"],
        browser: true,
        skip: EXTERNALS,
      }),

      commonjs({
        include: "node_modules/**",
        transformMixedEsModules: true,
      }),

      json({
        compact: true,
        preferConst: true,
      }),

      typescript({
        clean: true,
        exclude: [ "node_modules", "*.d.ts", "**/*.d.ts" ],
        include: [ "*.ts+(|x)", "**/*.ts+(|x)", "*.m?js+(|x)", "**/*.m?js+(|x)" ],
        tsconfig: "tsconfig.json",
        tsconfigOverride: {
          declaration: false,
        },
        useTsconfigDeclarationDir: true,
      }),

      babel({
        envName: "iife",
        extensions: EXTENSIONS,
        babelHelpers: "bundled",
        include: ["src/**/*"],
        exclude: ["node_modules/**/*"],
      }),

      terser({
        ecma: 5,
        safari10: true,
        compress: true,
        mangle: true,
      }),
    ],

    output: {
      banner: BANNER,
      esModule: false,
      exports: "named",
      file: "./dist/iife/index.min.js",
      format: "iife",
      name: PACKAGE_NAME,
      sourcemap: true,
      globals: GLOBALS,
    }
  },
  // TYPESCRIPT DECLARATIONS
  {
    input: "./types/index.d.ts",
    output: [
      // Browser
      { file: "./dist/iife/index.min.d.ts" },
      // CJS
      { file: "./dist/cjs/index.min.d.ts" },
      // ESM
      { file: "./dist/esm/index.min.d.ts" },
      // UMD
      { file: "./dist/umd/index.min.d.ts" },
    ],
    plugins: [
      dts(),
    ],
  },
];
