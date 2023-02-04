// const { split } = require("liquidjs/dist/builtin/filters");
const getAttributes = require("./getAttributes");

function attributeEntryToString2(attribute, context) {
  let [key, value] = attribute;

  if (typeof value === "function") {
    // Callback must return a string or a number
    value = value(context); // Run the provided callback and store the result
  }

  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(
      `Attribute "${key}" must have, or evaluate to, a value of type string or number, not "${typeof value}".`
    );
  }

  return `${key}="${value}"`;
}

/**
 * ## Usage
 * The function `getAttributes` is used to convert an object, `attributes`, with HTML attributes as keys and the values as the corresponding HTML attribute's values.
 * If it is falsey, an empty string will be returned.
 *
 * ```js
  getAttributes({
    tabindex: 0,
    'data-language': function (context) { return context.language; },
    'data-otherStuff': 'value'
  }) // => ' tabindex="0" data-language="JavaScript" data-otherStuff="value"'
  ```
 *
 * @param {{[s: string]: string | number}} attributes An object with key-value pairs that represent attributes.
 * @param {object} context An object with the current context.
 * @param {string} context.content The code to parse and highlight.
 * @param {string} context.language The language for the current instance.
 * @param {object} context.options The options passed to the syntax highlighter.
 * @returns {string} A string containing the above HTML attributes preceded by a single space.
 */
function parseSyntaxArguments(args, context = {}) {
  // console.log(">>pSA");
  // console.log(args);
  // console.log(">>>>>> context");
  // console.log(context);
  const preAttributes = getAttributes(context.preAttributes);
  const codeAttributes = getAttributes(context.codeAttributes);

  const lineNumbersRegex =
    /[0-9]{1,},[0-9]{1,}[:-][0-9]{1,}|[0-9]{1,},[0-9]{1,}|[0-9]{1,}/;

  // console.log("<<pSA");

  let splitArgs;

  if (args.includes("/")) {
    splitArgs = args.split("/");
  } else if (args.includes(" ")) {
    splitArgs = args.split(" ");
  } else {
    splitArgs = [args];
  }

  let opts = "";

  // Remove the lang from the arguments
  let lang = splitArgs.shift();

  if (context.lexerOverrides[lang]) {
    lang = context.lexerOverrides[lang];
  }

  opts += `--lexer ${lang} `;

  if (Array.isArray(splitArgs)) {
    splitArgs.forEach((arg) => {
      if (arg.includes("lineNumbersStart")) {
        opts = opts + `--html-base-line=${arg.split("=")[1]} `;
      } else if (lineNumbersRegex.test(arg)) {
        // console.log("Match Regex " + arg);
        if (arg.includes("-")) {
          arg = arg.replace("-", ":");
          // console.log("Replacing - with : " + arg);
        }
        opts = opts + `--html-highlight=${arg} `;
      }

      // console.log(arg);
    });
    // for (arg in splitArgs) {
    //   console.log(arg);
    // }
  }
  if (context["theme"]) {
    opts = opts + `--style ${context["theme"]} `;
  } else {
    opts = opts + "--style xcode-dark ";
  }

  if (context["lineNumbers"] || args.includes("lineNumbers")) {
    opts = opts + "--html-lines ";
  }

  if (context["lineNumbersStyle"] == "table" || args.includes("table")) {
    opts = opts + "--html-lines-table ";
  }

  return opts;
}

module.exports = parseSyntaxArguments;
