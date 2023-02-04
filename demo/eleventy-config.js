const syntaxHighlight = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    // alwaysWrapLineHighlights: true
    lexerOverrides: {
      njk: "vue",
      liquid: "swift",
    },
    preAttributes: { tabindex: 0 },
  });

  eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
