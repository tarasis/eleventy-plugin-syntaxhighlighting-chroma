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

  // Remove the lang from the arguments
  let lang = splitArgs.shift();

  if (context.lexerOverrides && context.lexerOverrides[lang]) {
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
      } else if (context["lineNumbers"] || args.includes("lineNumbers")) {
        opts = opts + "--html-lines ";
      } else if (
        context["lineNumbersStyle"] == "table" ||
        args.includes("table")
      ) {
        opts = opts + "--html-lines-table ";
      }
    });
  }
  if (context["theme"]) {
    opts = opts + `--style ${context["theme"]} `;
  } else {
    opts = opts + "--style xcode-dark ";
  }

  return opts;
}

module.exports = parseSyntaxArguments;
