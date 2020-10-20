module.exports = function (api) {
  api.cache(true);
  const presets = [
    [
      "@babel/preset-env",
      {
        "corejs": "3.6",
        "useBuiltIns": "entry",
        "modules": false,
        "bugfixes": true
      }
    ],
    "@babel/preset-typescript",
  ];
  const plugins = [];
  return {
      presets,
      plugins
  };
};
