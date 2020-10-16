"use strict";

module.exports = {
    // generate source map
    devtool: 'source-map',

    // bundling mode
    mode: 'production',

    // entry files
    entry: './src/index.ts',

    // output bundles (location)
    output: {
        path: `./dist`,
        filename: 'bundle.js',
    },

    // file resolutions
    resolve: {
        extensions: [
          '.js',
          '.ts',
          '.tsx'
        ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};
