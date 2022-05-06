module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        // "useBuiltIns": "usage",
        // "corejs": 3,
        "modules": false
      }
    ],
    "@babel/preset-react",
    ["@babel/preset-typescript", {
      allExtensions: true,
      isTSX: true
    }]
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    [
      "@babel/transform-runtime",
      {
        "corejs": 3
      }
    ],
  ]
}
