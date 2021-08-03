const path = require("path");
const sassResourcesLoader = require("craco-sass-resources-loader");

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  reactScriptsVersion: "react-scripts",
  webpack: {
    alias: {
      "@": resolvePath("./src"),
      "@components": resolvePath("./src/components"),
      "@scss": resolvePath("./src/scss"),
      "@layouts": resolvePath("./src/layouts"),
      "@pages": resolvePath("./src/pages"),
    },
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
            './src/scss/index.scss'
        ],
      },
    },
  ],
};
