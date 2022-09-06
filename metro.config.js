const { getDefaultConfig } = require("metro-config");

// eslint-disable-next-line no-undef
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      sourceExts,
      assetExts: [...assetExts, "hcscript"],
    },
  };
})();
