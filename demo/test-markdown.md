<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="../test.css">
    <!-- <link rel="stylesheet" href="../prism-theme.css"> -->
  </head>
  <body>

  Just `curious` what

No lang
```
function myFunction() {
  return true;
}
```

Langs
```ts
function myFunction() {
  return true;
}
```

```typescript
function myFunction() {
  return true;
}
```

```js
function myFunction() {
  return true;
}
```

```js
let multilineString = `
  this is the first line
  this is the middle line
  this is the last line
`;
```

## Dash line

```js/-
let multilineString = `
  this is the first line
  this is the middle line
  this is the last line
`;
```

Highlight 1 & 3
```js/1,3
let multilineString = `
  this is the first line
  this is the middle line
  this is the last line
`;
```

Highlight 1, 3-6

```js/1,3-6
let multilineString = `
  this is the first line
  this is the second line
  this is the third line
  this is the fourth line
  this is the fifth line
  this is the sixth line
  this is the seventh line
  this is the eighth line
`;
```

Highlight 1, 3-6

```js/1,3:6
let multilineString = `
  this is the first line
  this is the second line
  this is the third line
  this is the fourth line
  this is the fifth line
  this is the sixth line
  this is the seventh line
  this is the eighth line
`;
```

Line numbers and highlight
Highlight 1, 3-6

```js/1,3:6/lineNumbers
let multilineString = `
  this is the first line
  this is the second line
  this is the third line
  this is the fourth line
  this is the fifth line
  this is the sixth line
  this is the seventh line
  this is the eighth line
`;
```

Line numbers, highlight, base number 200, table
Highlight 1, 3-6

```js/1,3:6/lineNumbers/table/lineNumbersStart=200
let multilineString = `
  this is the first line
  this is the second line
  this is the third line
  this is the fourth line
  this is the fifth line
  this is the sixth line
  this is the seventh line
  this is the eighth line
`;
```

Line numbers, highlight, base number 200, table
Highlight 1, 3-6, separated spaces (won't work)

```swift 1,3:6 lineNumbers table lineNumbersStart=200
let multilineString = `
  this is the first line
  this is the second line
  this is the third line
  this is the fourth line
  this is the fifth line
  this is the sixth line
  this is the seventh line
  this is the eighth line
`;
```

## Other arguments

Table
```js/table
function myFunction() {
  return true;
}
```

linenums
```js/lineNumbers
function myFunction() {
  return true;
}
```

## Scrollbar

```js
import { aReallyLongFunctionNameThatCouldBeLongerButThisShouldBeLongEnoughByNowHopefully as anEvenLongerFunctionNameWithMoreCharactersThanCouldBeImaginedByAnyOnePersonInThisEntireWorldOfPeopleThatOneMightKnowAtLeastThatIsWhatIsTheorizedByThisLongName } from 'wow-this-is-so-long-you-might-need-a-scrollbar-to-see-it.long-ol-file-extension-that-should-not-be-this-long-on-a-real-site-but-this-is-to-demonstrate-the-accessibility-of-tabindex-and-scrollbars.js';
```

## CSS
```css
pre {
  display: block;
  padding: 0.75rem 1rem;
  line-height: 1.5;

  overflow-x: auto;
  background-color: #eee;
  font-size: 1em; /*14px /16*/
  -moz-tab-size: 2;
  -o-tab-size: 2;
  tab-size: 2;

  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;

  background-color: #272822;
  color: #fff;
}

:not(pre) > code[class*="language-"] {
     padding: 0.1em 0.3em;
     border-radius: 0.3em;
     white-space: normal;
 }

 .token.comment,
 .token.prolog,
 .token.doctype,
 .token.cdata {
     color: #8da1b9;
 }
```

  </body>
</html>
