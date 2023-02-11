const markdownChroma = require("./markdownSyntaxHighlightOptions");

module.exports = function (content, args, options = {}) {
  // No args, so don't know language, drop out
  if (!args) {
    return content;
  }

  if (options.trim === undefined || options.trim === true) {
    content = content.trim();
  }

  let mc = markdownChroma(options);
  return mc(content, args);
};
