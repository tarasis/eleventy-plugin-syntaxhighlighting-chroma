const Chroma = require("chroma-highlight");
const parseSyntaxArguments = require("./parseSyntaxArguments");
// const getAttributes = require("./getAttributes");

const jsdom = require("jsdom");

module.exports = function (options = {}) {
  return function (str, args) {
    if (!args) {
      // empty string means defer to the upstream escaping code built into markdown lib.
      return str;
    }

    let html;

    const parsedArgs = parseSyntaxArguments(args, options);

    let opts = `--formatter html --html-only --html-inline-styles ${parsedArgs} `;

    html = Chroma.highlight(str, opts);

    const dom = new jsdom.JSDOM(html);

    addAttributesToHtmlElements(
      dom.window.document.getElementsByTagName("pre"),
      options.preAttributes
    );

    addAttributesToHtmlElements(
      dom.window.document.getElementsByTagName("code"),
      options.codeAttributes
    );

    return dom.window.document.body.innerHTML;
  };
};

function addAttributesToHtmlElements(elements, attributes) {
  if (typeof attributes === "object") {
    for (let index = 0; index < elements.length; index++) {
      Object.entries(attributes).map((entry) => {
        if (typeof elements[index] === "object") {
          if (entry[0] === "style") {
            // check if style already set
            let style = elements[index].getAttribute("style");

            if (style != null) {
              elements[index].setAttribute(entry[0], style + entry[1]);
            } else {
              elements[index].setAttribute(entry[0], entry[1]);
            }
          } else {
            elements[index].setAttribute(entry[0], entry[1]);
          }
        } else {
          console.error("Can't set attribute on " + typeof elements[index]);
        }
      });
    }
  }
}
