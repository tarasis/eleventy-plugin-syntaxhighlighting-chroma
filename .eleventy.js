const pkg = require("./package.json");
const hasTemplateFormat = require("./src/hasTemplateFormat");
const HighlightPairedShortcode = require("./src/HighlightPairedShortcode");
const LiquidHighlightTag = require("./src/LiquidHighlightTag");
// const CharacterWrap = require("./src/CharacterWrap");
const markdownPrismJs = require("./src/markdownSyntaxHighlightOptions");

module.exports = {
  // initArguments: { Prism },
  configFunction: function (eleventyConfig, options = {}) {
    try {
      eleventyConfig.versionCheck(pkg["11ty"].compatibility);
    } catch (e) {
      console.log(
        `WARN: Eleventy Plugin (${pkg.name}) Compatibility: ${e.message}`
      );
    }

    options = Object.assign(
      {
        theme: "onedark",
        lineNumbers: false,
        /* lineNumbersStyle: "table",*/ /* "table" or "inline" */
        //alwaysWrapLineHighlights: false,
        // eligible to change the default to \n in a new major version.
        //lineSeparator: "<br>",
        preAttributes: {},
        codeAttributes: {
          theme: "onedark",
        },
      },
      options
    );

    if (hasTemplateFormat(options.templateFormats, "liquid")) {
      eleventyConfig.addLiquidTag("highlight", (liquidEngine) => {
        // {% highlight js 0,2 %}
        let highlight = new LiquidHighlightTag(liquidEngine);
        return highlight.getObject(options);
      });
    }

    if (hasTemplateFormat(options.templateFormats, "njk")) {
      eleventyConfig.addPairedNunjucksShortcode(
        "highlight",
        (content, args) => {
          // {% highlight "js 0,2-3" %}
          return HighlightPairedShortcode(content, args, options);
        }
      );
    }

    if (hasTemplateFormat(options.templateFormats, "md")) {
      // ```js/0,2-3
      eleventyConfig.addMarkdownHighlighter(markdownPrismJs(options));
    }

    // if (hasTemplateFormat(options.templateFormats, "11ty.js")) {
    //   eleventyConfig.addJavaScriptFunction(
    //     "highlight",
    //     (language, content, highlight1, highlight2) => {
    //       let highlightLines = [highlight1, highlight2]
    //         .filter((entry) => entry)
    //         .join(" ");
    //       let result = HighlightPairedShortcode(
    //         content,
    //         args,
    //         options
    //       );
    //       return result;
    //     }
    //   );
    // }
  },
};

module.exports.pairedShortcode = HighlightPairedShortcode;
// module.exports.CharacterWrap = CharacterWrap;
