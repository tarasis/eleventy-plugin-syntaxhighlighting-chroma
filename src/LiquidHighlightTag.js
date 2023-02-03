const HighlightPairedShortcode = require("./HighlightPairedShortcode");
const Chroma = require("chroma-highlight");
const parseSyntaxArguments = require("./parseSyntaxArguments");
const getAttributes = require("./getAttributes");

class LiquidHighlightTag {
  constructor(liquidEngine) {
    this.liquidEngine = liquidEngine;
  }

  getObject(options = {}) {
    let ret = function (highlighter) {
      return {
        parse: function (tagToken, remainTokens) {
          this.args = tagToken.args;

          this.tokens = [];

          var stream =
            highlighter.liquidEngine.parser.parseStream(remainTokens);

          stream
            .on("token", (token) => {
              if (token.name === "endhighlight") {
                stream.stop();
              } else {
                this.tokens.push(token);
              }
            })
            .on("end", (x) => {
              throw new Error(`tag ${tagToken.getText()} not closed`);
            });

          stream.start();
        },
        render: function (scope, hash) {
          let tokens = this.tokens.map((token) => {
            return token.raw || token.getText();
          });
          let tokenStr = tokens.join("").trim();
          console.log(this.args);
          return Promise.resolve(
            HighlightPairedShortcode(tokenStr, this.args, options)
          );
        },
      };
    };

    return ret(this);
  }
}

module.exports = LiquidHighlightTag;
