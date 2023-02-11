const pkg = require("./package.json");
const hasTemplateFormat = require("./src/hasTemplateFormat");
const HighlightPairedShortcode = require("./src/HighlightPairedShortcode");
const LiquidHighlightTag = require("./src/LiquidHighlightTag");
// const CharacterWrap = require("./src/CharacterWrap");
const markdownChroma = require("./src/markdownSyntaxHighlightOptions");

module.exports = {
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
        theme: "monokai",
        // lineNumbers: false,
        // highlightStyle: "bg:#293", /* any valid css */
        /* lineNumbersStyle: "table",*/ /* "table" or "inline" */
        preAttributes: {},
        codeAttributes: {},
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
      eleventyConfig.addMarkdownHighlighter(markdownChroma(options));
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
