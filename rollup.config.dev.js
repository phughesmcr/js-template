import { DEFAULT_EXTENSIONS } from "@babel/core";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from '@rollup/plugin-replace';
import dts from "rollup-plugin-dts";
import typescript from 'rollup-plugin-typescript2';

const PACKAGE_VERSION = process.env.npm_package_version;
const EXTENSIONS = [...DEFAULT_EXTENSIONS, ".ts", ".tsx"];
const EXTERNALS = {}; // list package.dependencies & package.peerDependencies here.
const GLOBALS = {};
const INPUT = "./src/index.ts";

export default [
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
        mainFields: ["module", "main"],
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
        tsconfig: "tsconfig.dev.json",
        useTsconfigDeclarationDir: true,
      }),
    ],

    output: [{
      esModule: true,
      exports: "named",
      file: "./dist/esm/index.min.js",
      format: "esm",
      sourcemap: false,
      globals: GLOBALS,
    }],
  },

  // TYPESCRIPT DECLARATIONS
  {
    input: "./types/index.d.ts",
    output: [
      {
        file: "./dist/esm/index.min.d.ts",
        format: "esm"
      },
    ],
    plugins: [
      dts(),
    ],
  },
];
