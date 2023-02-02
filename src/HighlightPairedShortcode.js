const Chroma = require("chroma-highlight");
const parseSyntaxArguments = require("./parseSyntaxArguments");

module.exports = function (content, args, options = {}) {
  // No args, so don't know language, drop out
  if (!args) {
    return content;
  }

  let highlightedContent;

  if (options.trim === undefined || options.trim === true) {
    content = content.trim();
  }

  if (args === "text") {
    highlightedContent = content;
  } else {
    const parsedArgs = parseSyntaxArguments(args, options);

    let opts = `--formatter html --html-only --html-inline-styles ${parsedArgs} `;

    highlightedContent = Chroma.highlight(content, opts);
  }

  return highlightedContent;
};
