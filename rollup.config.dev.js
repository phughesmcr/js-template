import { DEFAULT_EXTENSIONS } from "@babel/core";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';

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
    ],

    output: [{
      esModule: true,
      exports: "named",
      file: "./dist/dev/index.min.js",
      format: "es",
      sourcemap: false,
      globals: GLOBALS,
    }],
  },

  // TYPESCRIPT DECLARATIONS
  {
    input: "./types/index.d.ts",
    output: [
      {
        file: "./dist/dev/index.min.d.ts",
        format: "es"
      },
    ],
    plugins: [
      dts(),
    ],
  },
];
