"use strict";

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import dts from "rollup-plugin-dts";
import fs from 'fs';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { terser } from "rollup-plugin-terser";

const name = pkg.name;
const license = fs.readFileSync('./LICENSE', 'utf-8').split(/\r?\n/g).reduce((str, line) => str += ` * ${line}\n`, '');
const extensions = ['.js', '.jsx', '.mjs', '.ts', '.tsx'];

const bannerStr =
`/*! *****************************************************************************
 *
 * ${name}
 * v${pkg.version}
 *
${license}***************************************************************************** */\n`;

export default [
  {
    input: './src/index.ts',

    // https://rollupjs.org/guide/en#external-e-external
    external: [],

    plugins: [
      // Allows node_modules resolution
      resolve({ extensions }),

      // Allow bundling cjs modules. Rollup doesn't understand cjs
      commonjs({ include: 'node_modules/**' }),

      // Compile TypeScript/JavaScript files
      typescript({
        include: [ "*.ts+(|x)", "**/*.ts+(|x)", "*.js+(|x)", "**/*.js+(|x)" ],
        exclude: [ "node_modules" ],
        clean: true,
        typescript: require("typescript"),
        tslib: require('tslib')
      }),
    ],

    output: {
      file: pkg.jsnext,
      format: "es",
      sourcemap: true,
      banner: bannerStr,
    },
  },
  {
    input: "./types/index.d.ts",
    output: [{
      banner: bannerStr,
      file: "./build/index.d.ts",
      format: "es",
    }],
    plugins: [
      dts(),
    ],
  },
  {
    input: './src/index.ts',

    external: [],

    treeshake: {
      moduleSideEffects: false,
    },

    plugins: [
      resolve({ extensions }),

      commonjs({ include: 'node_modules/**' }),

      babel({
        extensions: [
          ...DEFAULT_EXTENSIONS,
          '.ts',
          '.tsx'
        ],
        babelHelpers: 'bundled',
        include: ["src/**/*"],
        exclude: ["node_modules/**"],
      }),
    ],

    output: [{
      banner: bannerStr,
      file: pkg.main,
      format: 'umd',
      name,
      sourcemap: 'inline',
      plugins: [
        terser(),
      ],
    }, {
      banner: bannerStr,
      file: pkg.module,
      format: 'es',
      sourcemap: 'inline',
      plugins: [
        terser(),
      ],
    }, {
      banner: bannerStr,
      file: pkg.browser,
      format: 'iife',
      name,
      sourcemap: 'inline',
      plugins: [
        terser(),
      ],
      globals: {},
    }],
  },
  {
    input: "./build/index.d.ts",
    output: [{
      file: pkg.types,
      format: "es"
    }],
    plugins: [
      dts(),
    ],
  },
];
