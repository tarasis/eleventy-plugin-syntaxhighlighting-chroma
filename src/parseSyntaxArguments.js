function parseSyntaxArguments(args, context = {}) {
  const lineNumbersRegex =
    /[0-9]{1,},[0-9]{1,}[:-][0-9]{1,}|[0-9]{1,},[0-9]{1,}|[0-9]{1,}/;

  let splitArgs;

  if (args.includes("/")) {
    splitArgs = args.split("/");
  } else if (args.includes(" ")) {
    splitArgs = args.split(" ");
  } else {
    splitArgs = [args];
  }

  let opts = "";

  // Context settings first, then if can be overriden by code block args
  if (context["lineNumbers"]) {
    opts += "--html-lines ";
  }
  if (context["lineNumbersStyle"] == "table") {
    opts += "--html-lines-table ";
  }

  if (context["theme"]) {
    opts += `--style ${context["theme"]} `;
  } else {
    opts += "--style xcode-dark ";
  }

  if (context["highlightStyle"]) {
    opts += `--html-highlight-style=${context["highlightStyle"]} `;
  }

  if (context["tabWidth"]) {
    opts += `--html-tab-width=${context["tabWidth"]} `;
  }

  // Remove the lang from the arguments
  let lang = splitArgs.shift();

  if (context.lexerOverrides && context.lexerOverrides[lang]) {
    lang = context.lexerOverrides[lang];
  }

  opts += `--lexer ${lang} `;

  if (Array.isArray(splitArgs)) {
    splitArgs.forEach((arg) => {
      if (arg.includes("lineNumbersStart")) {
        opts += `--html-base-line=${arg.split("=")[1]} `;
      } else if (arg.includes("lineNumbers")) {
        opts += "--html-lines ";
      } else if (arg.includes("table")) {
        opts += "--html-lines-table ";
      } else if (arg.includes("tabWidth")) {
        opts += `--html-tab-width=${arg.split("=")[1]} `;
      } else if (lineNumbersRegex.test(arg)) {
        // console.log("Match Regex " + arg);
        if (arg.includes("-")) {
          arg = arg.replace("-", ":");
          // console.log("Replacing - with : " + arg);
        }
        opts += `--html-highlight=${arg} `;
      }
    });
  }

  return opts;
}

module.exports = parseSyntaxArguments;
