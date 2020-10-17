module.exports = function (api) {
  api.cache(false);
  const presets = [
      [ "@babel/preset-typescript"],
      [
          "@babel/preset-env",
          {
              "corejs": 3,
              "useBuiltIns": "usage",
              "targets": "> 0.5%, last 2 versions, Firefox ESR, not dead, not IE",
              "modules": false,
              "bugfixes": true
          }
      ]
  ];
  const plugins = [
    [
      "@babel/transform-runtime",
      { corejs: 3 },
    ]
  ];
  return {
      presets,
      plugins
  };
};
