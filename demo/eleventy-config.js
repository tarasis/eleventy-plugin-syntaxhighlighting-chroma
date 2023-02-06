const syntaxHighlight = require("../.eleventy.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight, {
    theme: "monokai",
    lineNumbers: false,

    lexerOverrides: {
      njk: "vue",
      liquid: "vue",
    },
    preAttributes: {
      tabindex: 0,
      testing: "ZX Spectrum Forever",
      blargh: "Grrr Argh",
      style: "border: purple 5px dashed",
    },
    codeAttributes: { test: "123" },
  });

  eleventyConfig.setTemplateFormats("njk,liquid,md,css");
};
