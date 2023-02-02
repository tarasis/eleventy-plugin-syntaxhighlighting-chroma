const Chroma = require("chroma-highlight");
const parseSyntaxArguments = require("./parseSyntaxArguments");

module.exports = function (options = {}) {
  return function (str, args) {
    if (!args) {
      // empty string means defer to the upstream escaping code built into markdown lib.
      return str;
    }

    let html;

    if (args === "text") {
      html = str;
    } else {
      const parsedArgs = parseSyntaxArguments(args, options);

      let opts = `--formatter html --html-only --html-inline-styles ${parsedArgs} `;

      html = Chroma.highlight(str, opts);
    }

    return html;
  };
};
