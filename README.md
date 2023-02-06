<p align="center"><img src="https://www.11ty.dev/img/logo-github.svg" width="200" height="200" alt="eleventy Logo"></p>

# eleventy-plugin-syntaxhighlighting-chroma

A module for handling syntax highlighting in [Eleventy](https://github.com/11ty/eleventy) using [Chroma](https://github.com/alecthomas/chroma); a syntax highlighter written in Go. There is no browser/client JavaScript required, the highlight transformations are all done at build-time.

I am making using of the [chroma-highlight](https://github.com/krymel/chroma-highlight) NPM package to include `Chroma` support. (It handles downloading the required binary for the platform you are working on).

This module/plugin used the 11ty plugin [eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight) as its basis.

Finally, I use the [JSDom](https://www.npmjs.com/package/jsdom) package to add `pre` and `code` attributes to the syntax highlighted code.

## Supported Args in Code Blocks

The first argument is always expected to be the language, at present there is no bugout/fail if a language is not provided first. (Nor in the original plugin)

For example

````
```js
```
````

For Markdown, separate arguments with a `/`, this seems to be hard coded somewhere in 11ty itself. I haven't a workaround yet.

````
```js/1,3:6
```
````

For `liquid` and `njk` you can use either `\` or spaces (` `) to separate the arguments.

### Currently Supported Arguments:

- `lineNumbers` will add line numbers starting from 1 in the code block.
- `lineNumbersStyle` if `table` is used, then code block will use a table to make it easier to drag and select the code. i.e `lineNumberStyle=table`
- `lineNumbersStart` the number to start the line number count from. i.e `lineNumbersStart=200`
- number **or** number,number **or** number:number **or** number,rangeStartNumber:rangeEndNumber **or** number,rangeStartNumber-rangeEndNumber to specify a line or lines to highlight. i.e `1`, `1,3`, `3:6`, or `1,3:6`, or `2,4-6`. **NOTE** if you use `lineNumbersStart` then the specified numbers must be relative to that (so `lineNumbersStart=200`, then use `204` to highlight line 204)


## Supported `options` in eleventy config

You can specify some arguments in the options object in `.eleventy.js` config. ~~Options are considered defaults, and can be overridden by codeblock arguments.~~**TODO**

Example of `options` object

```
eleventyConfig.addPlugin(syntaxHighlight, {
    theme: "monokai",
    lineNumbers: false,

    lexerOverrides: {
      njk: "vue",
      liquid: "swift",
    },
    preAttributes: {
      tabindex: 0,
      testing: "ZX Spectrum Forever",
      blargh: "Grrr Argh",
      style: "border: purple 5px dashed",
    },
    codeAttributes: { test: "123" },
  });
```

Theme can be set to one of these [themes](https://xyproto.github.io/splash/docs/all.html). If no theme is specified, then `monokai` is used.

- `lineNumbers` will add line numbers starting from 1 for each code block.
- `lineNumbersStyle` if `table` is used, then code block will use a table to make it easier to drag and select the code.
- `lexerOverrides` a key value pair, for instance `liquid: "vue"` will mean that when the code comes across the language `liquid` it will use the `vue` lexer instead. Useful for rendering code blocks that `Chroma` doesn't support out of the box.

## TO DO

- [✅] Support `.liquid` files
- [✅] Add passed in `code` and `pre` atributes into returned html from chroma
- [] Add testing
- [] Add improve regex for line numbers
- [] Add other arguments that chroma can take (`--html-tab-width`, `--html-highlight-style`, maybe `--html-linkable-lines`)

## Example output

Highlight line 1 and 3

````
```js/1,3
let multilineString = `
  this is the first line
  this is the middle line
  this is the last line
`;
```
````

![](./images/hightlight-first-and-third-lines.png)

Line numbers shown and highlighting range of lines 3 through 6

````
```js/3:6/lineNumbers
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
````

![](./images/highlight-range-with-line-numbers.png)

Line numbers shown, line numbers set to start at 200, and highlighting range of lines 202 through 204

````
```js/202:204/lineNumbers/table/lineNumbersStart=200
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
````

![](./images/highlight-range-with-line-numbers-arbitary-start-number.png)

## Available Themes

The following themes are available:

```
abap algol algol_nu arduino autumn average base16-snazzy
borland bw catppuccin-frappe catppuccin-latte
catppuccin-macchiato catppuccin-mocha colorful doom-one
doom-one2 dracula emacs friendly fruity github github-dark
gruvbox gruvbox-light hr_high_contrast hrdark igor lovelace
manni modus-operandi modus-vivendi monokai monokailight
murphy native nord onedark onesenterprise paraiso-dark
paraiso-light pastie perldoc pygments rainbow_dash
rose-pine rose-pine-dawn rose-pine-moon rrt solarized-dark
solarized-dark256 solarized-light swapoff tango trac vim vs
vulcan witchhazel xcode xcode-dark
```

You can see examples of the [themes](https://xyproto.github.io/splash/docs/all.html).

## Available Lexers

Chroma provides highlighting for the following. Note you can use the lexer name itself, for instance `ActionScript` or its aliases `as` or `actionscript`.

**NOTE** If you spell the lexer incorrectly, or specify a language not understood by Chroma, then the build will fail. This was an intentional choice.

<details>
  <summary>Tap/Click to reveal Long Lexer list</summary>

```
ABAP
  aliases: abap
  filenames: *.abap *.ABAP
  mimetypes: text/x-abap
ABNF
  aliases: abnf
  filenames: *.abnf
  mimetypes: text/x-abnf
ActionScript
  aliases: as actionscript
  filenames: *.as
  mimetypes: application/x-actionscript text/x-actionscript text/actionscript
ActionScript 3
  aliases: as3 actionscript3
  filenames: *.as
  mimetypes: application/x-actionscript3 text/x-actionscript3 text/actionscript3
Ada
  aliases: ada ada95 ada2005
  filenames: *.adb *.ads *.ada
  mimetypes: text/x-ada
AL
  aliases: al
  filenames: *.al *.dal
  mimetypes: text/x-al
Angular2
  aliases: ng2
ANTLR
  aliases: antlr
ApacheConf
  aliases: apacheconf aconf apache
  filenames: .htaccess apache.conf apache2.conf
  mimetypes: text/x-apacheconf
APL
  aliases: apl
  filenames: *.apl
AppleScript
  aliases: applescript
  filenames: *.applescript
Arduino
  aliases: arduino
  filenames: *.ino
  mimetypes: text/x-arduino
ArmAsm
  aliases: armasm
  filenames: *.s *.S
  mimetypes: text/x-armasm text/x-asm
Awk
  aliases: awk gawk mawk nawk
  filenames: *.awk
  mimetypes: application/x-awk
Ballerina
  aliases: ballerina
  filenames: *.bal
  mimetypes: text/x-ballerina
Bash
  aliases: bash sh ksh zsh shell
  filenames: *.sh *.ksh *.bash *.ebuild *.eclass .env *.env *.exheres-0 *.exlib *.zsh *.zshrc .bashrc bashrc .bash_* bash_* zshrc .zshrc PKGBUILD
  mimetypes: application/x-sh application/x-shellscript
BashSession
  aliases: bash-session console shell-session
  filenames: .sh-session
  mimetypes: text/x-sh
Batchfile
  aliases: bat batch dosbatch winbatch
  filenames: *.bat *.cmd
  mimetypes: application/x-dos-batch
BibTeX
  aliases: bib bibtex
  filenames: *.bib
  mimetypes: text/x-bibtex
Bicep
  aliases: bicep
  filenames: *.bicep
BlitzBasic
  aliases: blitzbasic b3d bplus
  filenames: *.bb *.decls
  mimetypes: text/x-bb
BNF
  aliases: bnf
  filenames: *.bnf
  mimetypes: text/x-bnf
BQN
  aliases: bqn
  filenames: *.bqn
Brainfuck
  aliases: brainfuck bf
  filenames: *.bf *.b
  mimetypes: application/x-brainfuck
C
  aliases: c
  filenames: *.c *.h *.idc *.x[bp]m
  mimetypes: text/x-chdr text/x-csrc image/x-xbitmap image/x-xpixmap
C#
  aliases: csharp c#
  filenames: *.cs
  mimetypes: text/x-csharp
C++
  aliases: cpp c++
  filenames: *.cpp *.hpp *.c++ *.h++ *.cc *.hh *.cxx *.hxx *.C *.H *.cp *.CPP
  mimetypes: text/x-c++hdr text/x-c++src
Caddyfile
  aliases: caddyfile caddy
  filenames: Caddyfile*
Caddyfile Directives
  aliases: caddyfile-directives caddyfile-d caddy-d
Cap'n Proto
  aliases: capnp
  filenames: *.capnp
Cassandra CQL
  aliases: cassandra cql
  filenames: *.cql
  mimetypes: text/x-cql
Ceylon
  aliases: ceylon
  filenames: *.ceylon
  mimetypes: text/x-ceylon
CFEngine3
  aliases: cfengine3 cf3
  filenames: *.cf
cfstatement
  aliases: cfs
ChaiScript
  aliases: chai chaiscript
  filenames: *.chai
  mimetypes: text/x-chaiscript application/x-chaiscript
Chapel
  aliases: chapel chpl
  filenames: *.chpl
Cheetah
  aliases: cheetah spitfire
  filenames: *.tmpl *.spt
  mimetypes: application/x-cheetah application/x-spitfire
Clojure
  aliases: clojure clj
  filenames: *.clj
  mimetypes: text/x-clojure application/x-clojure
CMake
  aliases: cmake
  filenames: *.cmake CMakeLists.txt
  mimetypes: text/x-cmake
COBOL
  aliases: cobol
  filenames: *.cob *.COB *.cpy *.CPY
  mimetypes: text/x-cobol
CoffeeScript
  aliases: coffee-script coffeescript coffee
  filenames: *.coffee
  mimetypes: text/coffeescript
Common Lisp
  aliases: common-lisp cl lisp
  filenames: *.cl *.lisp
  mimetypes: text/x-common-lisp
Common Lisp
  aliases: common-lisp cl lisp
  filenames: *.cl *.lisp
  mimetypes: text/x-common-lisp
Coq
  aliases: coq
  filenames: *.v
  mimetypes: text/x-coq
Crystal
  aliases: cr crystal
  filenames: *.cr
  mimetypes: text/x-crystal
CSS
  aliases: css
  filenames: *.css
  mimetypes: text/css
Cython
  aliases: cython pyx pyrex
  filenames: *.pyx *.pxd *.pxi
  mimetypes: text/x-cython application/x-cython
D
  aliases: d
  filenames: *.d *.di
  mimetypes: text/x-d
Dart
  aliases: dart
  filenames: *.dart
  mimetypes: text/x-dart
Diff
  aliases: diff udiff
  filenames: *.diff *.patch
  mimetypes: text/x-diff text/x-patch
Django/Jinja
  aliases: django jinja
  mimetypes: application/x-django-templating application/x-jinja
dns
  aliases: zone bind
Docker
  aliases: docker dockerfile
  filenames: Dockerfile Dockerfile.* *.docker
  mimetypes: text/x-dockerfile-config
DTD
  aliases: dtd
  filenames: *.dtd
  mimetypes: application/xml-dtd
Dylan
  aliases: dylan
  filenames: *.dylan *.dyl *.intr
  mimetypes: text/x-dylan
EBNF
  aliases: ebnf
  filenames: *.ebnf
  mimetypes: text/x-ebnf
Elixir
  aliases: elixir ex exs
  filenames: *.ex *.exs
  mimetypes: text/x-elixir
Elm
  aliases: elm
  filenames: *.elm
  mimetypes: text/x-elm
EmacsLisp
  aliases: emacs elisp emacs-lisp
  filenames: *.el
  mimetypes: text/x-elisp application/x-elisp
EmacsLisp
  aliases: emacs elisp emacs-lisp
  filenames: *.el
  mimetypes: text/x-elisp application/x-elisp
Erlang
  aliases: erlang
  filenames: *.erl *.hrl *.es *.escript
  mimetypes: text/x-erlang
Factor
  aliases: factor
  filenames: *.factor
  mimetypes: text/x-factor
Fennel
  aliases: fennel fnl
  filenames: *.fennel
  mimetypes: text/x-fennel application/x-fennel
Fish
  aliases: fish fishshell
  filenames: *.fish *.load
  mimetypes: application/x-fish
Forth
  aliases: forth
  filenames: *.frt *.fth *.fs
  mimetypes: application/x-forth
Fortran
  aliases: fortran f90
  filenames: *.f03 *.f90 *.f95 *.F03 *.F90 *.F95
  mimetypes: text/x-fortran
FortranFixed
  aliases: fortranfixed
  filenames: *.f *.F
  mimetypes: text/x-fortran
FSharp
  aliases: fsharp
  filenames: *.fs *.fsi
  mimetypes: text/x-fsharp
GAS
  aliases: gas asm
  filenames: *.s *.S
  mimetypes: text/x-gas
GDScript
  aliases: gdscript gd
  filenames: *.gd
  mimetypes: text/x-gdscript application/x-gdscript
Genshi
  aliases: genshi kid xml+genshi xml+kid
  filenames: *.kid
  mimetypes: application/x-genshi application/x-kid
Genshi HTML
  aliases: html+genshi html+kid
  mimetypes: text/html+genshi
Genshi Text
  aliases: genshitext
  mimetypes: application/x-genshi-text text/x-genshi
Gherkin
  aliases: cucumber Cucumber gherkin Gherkin
  filenames: *.feature *.FEATURE
  mimetypes: text/x-gherkin
GLSL
  aliases: glsl
  filenames: *.vert *.frag *.geo
  mimetypes: text/x-glslsrc
Gnuplot
  aliases: gnuplot
  filenames: *.plot *.plt
  mimetypes: text/x-gnuplot
Go
  aliases: go golang
  filenames: *.go
  mimetypes: text/x-gosrc
Go HTML Template
  aliases: go-html-template
Go HTML Template
  aliases: go-html-template
Go Text Template
  aliases: go-text-template
GraphQL
  aliases: graphql graphqls gql
  filenames: *.graphql *.graphqls
Groff
  aliases: groff nroff man
  filenames: *.[1-9] *.1p *.3pm *.man
  mimetypes: application/x-troff text/troff
Groovy
  aliases: groovy
  filenames: *.groovy *.gradle
  mimetypes: text/x-groovy
Handlebars
  aliases: handlebars hbs
  filenames: *.handlebars *.hbs
Haskell
  aliases: haskell hs
  filenames: *.hs
  mimetypes: text/x-haskell
Haxe
  aliases: hx haxe hxsl
  filenames: *.hx *.hxsl
  mimetypes: text/haxe text/x-haxe text/x-hx
HCL
  aliases: hcl
  filenames: *.hcl
  mimetypes: application/x-hcl
Hexdump
  aliases: hexdump
HLB
  aliases: hlb
  filenames: *.hlb
HLSL
  aliases: hlsl
  filenames: *.hlsl *.hlsli
  mimetypes: text/x-hlsl
HTML
  aliases: html
  filenames: *.html *.htm *.xhtml *.xslt
  mimetypes: text/html application/xhtml+xml
HTTP
  aliases: http
Hy
  aliases: hylang
  filenames: *.hy
  mimetypes: text/x-hy application/x-hy
Idris
  aliases: idris idr
  filenames: *.idr
  mimetypes: text/x-idris
Igor
  aliases: igor igorpro
  filenames: *.ipf
  mimetypes: text/ipf
INI
  aliases: ini cfg dosini
  filenames: *.ini *.cfg *.inf *.service *.socket .gitconfig .editorconfig pylintrc .pylintrc
  mimetypes: text/x-ini text/inf
Io
  aliases: io
  filenames: *.io
  mimetypes: text/x-iosrc
J
  aliases: j
  filenames: *.ijs
  mimetypes: text/x-j
Java
  aliases: java
  filenames: *.java
  mimetypes: text/x-java
JavaScript
  aliases: js javascript
  filenames: *.js *.jsm *.mjs *.cjs
  mimetypes: application/javascript application/x-javascript text/x-javascript text/javascript
JSON
  aliases: json
  filenames: *.json
  mimetypes: application/json
Julia
  aliases: julia jl
  filenames: *.jl
  mimetypes: text/x-julia application/x-julia
Jungle
  aliases: jungle
  filenames: *.jungle
  mimetypes: text/x-jungle
Kotlin
  aliases: kotlin
  filenames: *.kt
  mimetypes: text/x-kotlin
Lighttpd configuration file
  aliases: lighty lighttpd
  mimetypes: text/x-lighttpd-conf
LLVM
  aliases: llvm
  filenames: *.ll
  mimetypes: text/x-llvm
Lua
  aliases: lua
  filenames: *.lua *.wlua
  mimetypes: text/x-lua application/x-lua
Makefile
  aliases: make makefile mf bsdmake
  filenames: *.mak *.mk Makefile makefile Makefile.* GNUmakefile BSDmakefile
  mimetypes: text/x-makefile
Mako
  aliases: mako
  filenames: *.mao
  mimetypes: application/x-mako
markdown
  aliases: md mkd
  filenames: *.md *.mkd *.markdown
  mimetypes: text/x-markdown
Mason
  aliases: mason
  filenames: *.m *.mhtml *.mc *.mi autohandler dhandler
  mimetypes: application/x-mason
Mathematica
  aliases: mathematica mma nb
  filenames: *.nb *.cdf *.nbp *.ma
  mimetypes: application/mathematica application/vnd.wolfram.mathematica application/vnd.wolfram.mathematica.package application/vnd.wolfram.cdf
Matlab
  aliases: matlab
  filenames: *.m
  mimetypes: text/matlab
mcfunction
  aliases: mcfunction
  filenames: *.mcfunction
Meson
  aliases: meson meson.build
  filenames: meson.build meson_options.txt
  mimetypes: text/x-meson
Metal
  aliases: metal
  filenames: *.metal
  mimetypes: text/x-metal
MiniZinc
  aliases: minizinc MZN mzn
  filenames: *.mzn *.dzn *.fzn
  mimetypes: text/minizinc
MLIR
  aliases: mlir
  filenames: *.mlir
  mimetypes: text/x-mlir
Modula-2
  aliases: modula2 m2
  filenames: *.def *.mod
  mimetypes: text/x-modula2
MonkeyC
  aliases: monkeyc
  filenames: *.mc
  mimetypes: text/x-monkeyc
MorrowindScript
  aliases: morrowind mwscript
Myghty
  aliases: myghty
  filenames: *.myt autodelegate
  mimetypes: application/x-myghty
MySQL
  aliases: mysql mariadb
  filenames: *.sql
  mimetypes: text/x-mysql text/x-mariadb
NASM
  aliases: nasm
  filenames: *.asm *.ASM
  mimetypes: text/x-nasm
Newspeak
  aliases: newspeak
  filenames: *.ns2
  mimetypes: text/x-newspeak
Nginx configuration file
  aliases: nginx
  filenames: nginx.conf
  mimetypes: text/x-nginx-conf
Nim
  aliases: nim nimrod
  filenames: *.nim *.nimrod
  mimetypes: text/x-nim
Nix
  aliases: nixos nix
  filenames: *.nix
  mimetypes: text/x-nix
Objective-C
  aliases: objective-c objectivec obj-c objc
  filenames: *.m *.h
  mimetypes: text/x-objective-c
OCaml
  aliases: ocaml
  filenames: *.ml *.mli *.mll *.mly
  mimetypes: text/x-ocaml
Octave
  aliases: octave
  filenames: *.m
  mimetypes: text/octave
OnesEnterprise
  aliases: ones onesenterprise 1S 1S:Enterprise
  filenames: *.EPF *.epf *.ERF *.erf
  mimetypes: application/octet-stream
OpenEdge ABL
  aliases: openedge abl progress openedgeabl
  filenames: *.p *.cls *.w *.i
  mimetypes: text/x-openedge application/x-openedge
OpenSCAD
  aliases: openscad
  filenames: *.scad
  mimetypes: text/x-scad
Org Mode
  aliases: org orgmode
  filenames: *.org
  mimetypes: text/org
PacmanConf
  aliases: pacmanconf
  filenames: pacman.conf
Perl
  aliases: perl pl
  filenames: *.pl *.pm *.t
  mimetypes: text/x-perl application/x-perl
PHP
  aliases: php php3 php4 php5
  filenames: *.php *.php[345] *.inc
  mimetypes: text/x-php
PHTML
  aliases: phtml
  filenames: *.phtml *.php *.php[345] *.inc
  mimetypes: application/x-php application/x-httpd-php application/x-httpd-php3 application/x-httpd-php4 application/x-httpd-php5 text/x-php
Pig
  aliases: pig
  filenames: *.pig
  mimetypes: text/x-pig
PkgConfig
  aliases: pkgconfig
  filenames: *.pc
PL/pgSQL
  aliases: plpgsql
  mimetypes: text/x-plpgsql
plaintext
  aliases: text plain no-highlight
  filenames: *.txt
  mimetypes: text/plain
Plutus Core
  aliases: plutus-core plc
  filenames: *.plc
  mimetypes: text/x-plutus-core application/x-plutus-core
Pony
  aliases: pony
  filenames: *.pony
PostgreSQL SQL dialect
  aliases: postgresql postgres
  mimetypes: text/x-postgresql
PostScript
  aliases: postscript postscr
  filenames: *.ps *.eps
  mimetypes: application/postscript
POVRay
  aliases: pov
  filenames: *.pov *.inc
  mimetypes: text/x-povray
PowerQuery
  aliases: powerquery pq
  filenames: *.pq
  mimetypes: text/x-powerquery
PowerShell
  aliases: powershell posh ps1 psm1 psd1 pwsh
  filenames: *.ps1 *.psm1 *.psd1
  mimetypes: text/x-powershell
Prolog
  aliases: prolog
  filenames: *.ecl *.prolog *.pro *.pl
  mimetypes: text/x-prolog
PromQL
  aliases: promql
  filenames: *.promql
properties
  aliases: java-properties
  filenames: *.properties
  mimetypes: text/x-java-properties
Protocol Buffer
  aliases: protobuf proto
  filenames: *.proto
PSL
  aliases: psl
  filenames: *.psl *.BATCH *.TRIG *.PROC
  mimetypes: text/x-psl
Puppet
  aliases: puppet
  filenames: *.pp
Python
  aliases: python py sage python3 py3
  filenames: *.py *.pyi *.pyw *.jy *.sage *.sc SConstruct SConscript *.bzl BUCK BUILD BUILD.bazel WORKSPACE *.tac
  mimetypes: text/x-python application/x-python text/x-python3 application/x-python3
Python 2
  aliases: python2 py2
  mimetypes: text/x-python2 application/x-python2
QBasic
  aliases: qbasic basic
  filenames: *.BAS *.bas
  mimetypes: text/basic
QML
  aliases: qml qbs
  filenames: *.qml *.qbs
  mimetypes: application/x-qml application/x-qt.qbs+qml
R
  aliases: splus s r
  filenames: *.S *.R *.r .Rhistory .Rprofile .Renviron
  mimetypes: text/S-plus text/S text/x-r-source text/x-r text/x-R text/x-r-history text/x-r-profile
Racket
  aliases: racket rkt
  filenames: *.rkt *.rktd *.rktl
  mimetypes: text/x-racket application/x-racket
Ragel
  aliases: ragel
Raku
  aliases: perl6 pl6 raku
  filenames: *.pl *.pm *.nqp *.p6 *.6pl *.p6l *.pl6 *.6pm *.p6m *.pm6 *.t *.raku *.rakumod *.rakutest *.rakudoc
  mimetypes: text/x-perl6 application/x-perl6 text/x-raku application/x-raku
react
  aliases: jsx react
  filenames: *.jsx *.react
  mimetypes: text/jsx text/typescript-jsx
ReasonML
  aliases: reason reasonml
  filenames: *.re *.rei
  mimetypes: text/x-reasonml
reg
  aliases: registry
  filenames: *.reg
  mimetypes: text/x-windows-registry
reStructuredText
  aliases: rst rest restructuredtext
  filenames: *.rst *.rest
  mimetypes: text/x-rst text/prs.fallenstein.rst
Rexx
  aliases: rexx arexx
  filenames: *.rexx *.rex *.rx *.arexx
  mimetypes: text/x-rexx
Ruby
  aliases: rb ruby duby
  filenames: *.rb *.rbw Rakefile *.rake *.gemspec *.rbx *.duby Gemfile
  mimetypes: text/x-ruby application/x-ruby
Rust
  aliases: rust rs
  filenames: *.rs *.rs.in
  mimetypes: text/rust text/x-rust
SAS
  aliases: sas
  filenames: *.SAS *.sas
  mimetypes: text/x-sas text/sas application/x-sas
Sass
  aliases: sass
  filenames: *.sass
  mimetypes: text/x-sass
Scala
  aliases: scala
  filenames: *.scala
  mimetypes: text/x-scala
Scheme
  aliases: scheme scm
  filenames: *.scm *.ss
  mimetypes: text/x-scheme application/x-scheme
Scilab
  aliases: scilab
  filenames: *.sci *.sce *.tst
  mimetypes: text/scilab
SCSS
  aliases: scss
  filenames: *.scss
  mimetypes: text/x-scss
Sed
  aliases: sed gsed ssed
  filenames: *.sed *.[gs]sed
  mimetypes: text/x-sed
Sieve
  aliases: sieve
  filenames: *.siv *.sieve
Smalltalk
  aliases: smalltalk squeak st
  filenames: *.st
  mimetypes: text/x-smalltalk
Smarty
  aliases: smarty
  filenames: *.tpl
  mimetypes: application/x-smarty
Snobol
  aliases: snobol
  filenames: *.snobol
  mimetypes: text/x-snobol
Solidity
  aliases: sol solidity
  filenames: *.sol
SPARQL
  aliases: sparql
  filenames: *.rq *.sparql
  mimetypes: application/sparql-query
SQL
  aliases: sql
  filenames: *.sql
  mimetypes: text/x-sql
SquidConf
  aliases: squidconf squid.conf squid
  filenames: squid.conf
  mimetypes: text/x-squidconf
Standard ML
  aliases: sml
  filenames: *.sml *.sig *.fun
  mimetypes: text/x-standardml application/x-standardml
stas
  filenames: *.stas
Stylus
  aliases: stylus
  filenames: *.styl
  mimetypes: text/x-styl
Svelte
  aliases: svelte
  filenames: *.svelte
  mimetypes: application/x-svelte
Swift
  aliases: swift
  filenames: *.swift
  mimetypes: text/x-swift
SYSTEMD
  aliases: systemd
  filenames: *.automount *.device *.dnssd *.link *.mount *.netdev *.network *.path *.scope *.service *.slice *.socket *.swap *.target *.timer
  mimetypes: text/plain
systemverilog
  aliases: systemverilog sv
  filenames: *.sv *.svh
  mimetypes: text/x-systemverilog
TableGen
  aliases: tablegen
  filenames: *.td
  mimetypes: text/x-tablegen
TASM
  aliases: tasm
  filenames: *.asm *.ASM *.tasm
  mimetypes: text/x-tasm
Tcl
  aliases: tcl
  filenames: *.tcl *.rvt
  mimetypes: text/x-tcl text/x-script.tcl application/x-tcl
Tcsh
  aliases: tcsh csh
  filenames: *.tcsh *.csh
  mimetypes: application/x-csh
Termcap
  aliases: termcap
  filenames: termcap termcap.src
Terminfo
  aliases: terminfo
  filenames: terminfo terminfo.src
Terraform
  aliases: terraform tf
  filenames: *.tf
  mimetypes: application/x-tf application/x-terraform
TeX
  aliases: tex latex
  filenames: *.tex *.aux *.toc
  mimetypes: text/x-tex text/x-latex
Thrift
  aliases: thrift
  filenames: *.thrift
  mimetypes: application/x-thrift
TOML
  aliases: toml
  filenames: *.toml
  mimetypes: text/x-toml
TradingView
  aliases: tradingview tv
  filenames: *.tv
  mimetypes: text/x-tradingview
Transact-SQL
  aliases: tsql t-sql
  mimetypes: text/x-tsql
Turing
  aliases: turing
  filenames: *.turing *.tu
  mimetypes: text/x-turing
Turtle
  aliases: turtle
  filenames: *.ttl
  mimetypes: text/turtle application/x-turtle
Twig
  aliases: twig
  mimetypes: application/x-twig
TypeScript
  aliases: ts tsx typescript
  filenames: *.ts *.tsx *.mts *.cts
  mimetypes: text/x-typescript
TypoScript
  aliases: typoscript
  filenames: *.ts
  mimetypes: text/x-typoscript
TypoScriptCssData
  aliases: typoscriptcssdata
TypoScriptHtmlData
  aliases: typoscripthtmldata
V
  aliases: v vlang
  filenames: *.v *.vv v.mod
  mimetypes: text/x-v
V shell
  aliases: vsh vshell
  filenames: *.vsh
  mimetypes: text/x-vsh
Vala
  aliases: vala vapi
  filenames: *.vala *.vapi
  mimetypes: text/x-vala
VB.net
  aliases: vb.net vbnet
  filenames: *.vb *.bas
  mimetypes: text/x-vbnet text/x-vba
verilog
  aliases: verilog v
  filenames: *.v
  mimetypes: text/x-verilog
VHDL
  aliases: vhdl
  filenames: *.vhdl *.vhd
  mimetypes: text/x-vhdl
VHS
  aliases: vhs tape cassette
  filenames: *.tape
VimL
  aliases: vim
  filenames: *.vim .vimrc .exrc .gvimrc _vimrc _exrc _gvimrc vimrc gvimrc
  mimetypes: text/x-vim
vue
  aliases: vue vuejs
  filenames: *.vue
  mimetypes: text/x-vue application/x-vue
WDTE
  filenames: *.wdte
Whiley
  aliases: whiley
  filenames: *.whiley
  mimetypes: text/x-whiley
XML
  aliases: xml
  filenames: *.xml *.xsl *.rss *.xslt *.xsd *.wsdl *.wsf *.svg *.csproj *.vcxproj *.fsproj
  mimetypes: text/xml application/xml image/svg+xml application/rss+xml application/atom+xml
Xorg
  aliases: xorg.conf
  filenames: xorg.conf
YAML
  aliases: yaml
  filenames: *.yaml *.yml
  mimetypes: text/x-yaml
YANG
  aliases: yang
  filenames: *.yang
  mimetypes: application/yang
Zed
  aliases: zed
  filenames: *.zed
  mimetypes: text/zed
Zig
  aliases: zig
  filenames: *.zig
  mimetypes: text/zig
```
</details>


## Caveats

At present `Chroma` doesn't have support for highlighting `njk` or `liquid` code. As an alternative you can use `vue` in your documents, or use `lexerOverride` in `.eleventy.js` to specify a different lexer to use if `njk` or `liquid` are found.

Using this plugin is slower than either the offical highlighting plugin, or the [highlightjs](https://github.com/b-kelly/eleventy-plugin-highlightjs) plugin. More below.

## Thanks

I am stepping on the shoulders of others.

This plugin is based off of the official [eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight) plugin by Zach Leatherman et al. I modified its code to work with the Chroma highlighter.

I pull in the [chroma-highlight](https://github.com/krymel/chroma-highlight) NPM package by krymel. It downloads the Chroma highlighter binary for the platform you are on, and makes it available through a function to call where you pass in the formatter to use, the language, and any options.

Finally the [Chroma Highlighter](https://github.com/alecthomas/chroma) itself, by Alec Thomas. Tons of languages, themes, and its blazing fast. (Except when used this way)

## BENCH Results

At the moment, this plugin is the slowest by a factor of 7-8.

```
offical: Wrote 5 files in 0.09 seconds (v1.0.2)
highlightjs: Wrote 5 files in 0.11 seconds (v1.0.1)
chroma: Wrote 5 files in 0.74 seconds (v1.0.2)
```

Each block of code to be highlighted is a call to the `chroma` executable, and takes about 10-20ms. Rendering a whole page using the executable itself from the command line takes roughly 0.030 seconds (or 30ms) on an M1 MacBook Air.

```
❯ time node_modules/chroma-highlight/bin/chroma --formatter html --lexer js --html-inline-styles ../test/JavaScriptFunctionTest.js
<snip output>
node_modules/chroma-highlight/bin/chroma --formatter html --lexer js    0.01s user 0.01s system 60% cpu 0.030 total
```

### 11ty offical Highlighter

```
> @11ty/eleventy-plugin-syntaxhighlight@4.2.0 bench
> DEBUG=Eleventy:Benchmark* npx @11ty/eleventy --input=demo --output=demo/_site --config=demo/eleventy-config.js

  Eleventy:Benchmark Benchmark      5ms   3%    11× (Configuration) "highlight" Nunjucks Paired Shortcode +0ms
  Eleventy:Benchmark Benchmark      2ms   1%     1× (Aggregate) Configuration addPlugin +0ms
  Eleventy:Benchmark Benchmark      6ms   4%     2× (Aggregate) Searching the file system +0ms
  Eleventy:Benchmark Benchmark     14ms   9%     5× (Aggregate) Template Read +0ms
  Eleventy:Benchmark Benchmark      7ms   4%     5× (Aggregate) Template Compile +0ms
  Eleventy:Benchmark Benchmark      1ms   0%     1× (Aggregate) > Compile > ./demo/2020-04-20-swift-coding-challenge-2.md +0ms
  Eleventy:Benchmark Benchmark     35ms  22%     5× (Aggregate) Render +0ms
  Eleventy:Benchmark Benchmark      7ms   4%     1× (Aggregate) > Render > ./demo/2020-04-20-swift-coding-challenge-2.md +0ms
  Eleventy:Benchmark Benchmark      7ms   4%     1× (Aggregate) > Render > demo/_site/2020-04-20-swift-coding-challenge-2/index.html +0ms
  Eleventy:Benchmark Benchmark      1ms   1%     1× (Aggregate) > Compile > ./demo/file-with-liquid-tags.md +0ms
  Eleventy:Benchmark Benchmark     11ms   7%     1× (Aggregate) > Render > ./demo/file-with-liquid-tags.md +0ms
  Eleventy:Benchmark Benchmark     11ms   7%     1× (Aggregate) > Render > demo/_site/file-with-liquid-tags/index.html +0ms
  Eleventy:Benchmark Benchmark      6ms   3%     1× (Aggregate) > Render > ./demo/test-liquid.liquid +0ms
  Eleventy:Benchmark Benchmark      6ms   3%     1× (Aggregate) > Render > demo/_site/test-liquid/index.html +0ms
  Eleventy:Benchmark Benchmark      5ms   3%     1× (Aggregate) > Render > ./demo/test-markdown.md +0ms
  Eleventy:Benchmark Benchmark      5ms   3%     1× (Aggregate) > Render > demo/_site/test-markdown/index.html +0ms
  Eleventy:Benchmark Benchmark      4ms   3%     1× (Aggregate) > Compile > ./demo/test-nunjucks.njk +0ms
  Eleventy:Benchmark Benchmark      5ms   3%     1× (Aggregate) > Render > ./demo/test-nunjucks.njk +1ms
  Eleventy:Benchmark Benchmark      5ms   3%     1× (Aggregate) > Render > demo/_site/test-nunjucks/index.html +0ms
  Eleventy:Benchmark Benchmark      2ms   2%     5× (Aggregate) Template Write +0ms
  Eleventy:Benchmark Benchmark      3ms   2%     2× (Aggregate) Passthrough Copy File +0ms
[11ty] Copied 2 files / Wrote 5 files in 0.09 seconds (v1.0.2)
```

### eleventy-plugin-highlightjs

```

> eleventy-plugin-highlightjs@1.1.0 bench
> DEBUG=Eleventy:Benchmark* npx @11ty/eleventy --input=demo --output=demo/_site --config=demo/eleventy-config.js

  Eleventy:Benchmark Benchmark      6ms   3%    11× (Configuration) "highlight" Nunjucks Paired Shortcode +0ms
  Eleventy:Benchmark Benchmark      6ms   3%     2× (Aggregate) Searching the file system +1ms
  Eleventy:Benchmark Benchmark     15ms   8%     5× (Aggregate) Template Read +0ms
  Eleventy:Benchmark Benchmark      6ms   3%     5× (Aggregate) Template Compile +0ms
  Eleventy:Benchmark Benchmark      1ms   0%     1× (Aggregate) > Compile > ./demo/2020-04-20-swift-coding-challenge-2.md +0ms
  Eleventy:Benchmark Benchmark     53ms  27%     5× (Aggregate) Render +0ms
  Eleventy:Benchmark Benchmark     17ms   9%     1× (Aggregate) > Render > ./demo/2020-04-20-swift-coding-challenge-2.md +0ms
  Eleventy:Benchmark Benchmark     17ms   9%     1× (Aggregate) > Render > demo/_site/2020-04-20-swift-coding-challenge-2/index.html +0ms
  Eleventy:Benchmark Benchmark      1ms   1%     1× (Aggregate) > Compile > ./demo/file-with-liquid-tags.md +0ms
  Eleventy:Benchmark Benchmark      9ms   5%     1× (Aggregate) > Render > ./demo/file-with-liquid-tags.md +0ms
  Eleventy:Benchmark Benchmark      9ms   5%     1× (Aggregate) > Render > demo/_site/file-with-liquid-tags/index.html +0ms
  Eleventy:Benchmark Benchmark      6ms   3%     1× (Aggregate) > Render > ./demo/test-liquid.liquid +0ms
  Eleventy:Benchmark Benchmark      6ms   3%     1× (Aggregate) > Render > demo/_site/test-liquid/index.html +0ms
  Eleventy:Benchmark Benchmark     15ms   7%     1× (Aggregate) > Render > ./demo/test-markdown.md +0ms
  Eleventy:Benchmark Benchmark     15ms   7%     1× (Aggregate) > Render > demo/_site/test-markdown/index.html +0ms
  Eleventy:Benchmark Benchmark      3ms   2%     1× (Aggregate) > Compile > ./demo/test-nunjucks.njk +0ms
  Eleventy:Benchmark Benchmark      6ms   3%     1× (Aggregate) > Render > ./demo/test-nunjucks.njk +0ms
  Eleventy:Benchmark Benchmark      6ms   3%     1× (Aggregate) > Render > demo/_site/test-nunjucks/index.html +0ms
  Eleventy:Benchmark Benchmark      3ms   2%     5× (Aggregate) Template Write +0ms
  Eleventy:Benchmark Benchmark      3ms   1%     2× (Aggregate) Passthrough Copy File +0ms
[11ty] Copied 2 files / Wrote 5 files in 0.11 seconds (v1.0.1)
```

### This plugin

```
> eleventy-plugin-syntaxhighlight-chroma@0.0.1 bench
> DEBUG=Eleventy:Benchmark* npx @11ty/eleventy --input=demo --output=demo/_site --config=demo/eleventy-config.js

  Eleventy:Benchmark Benchmark    132ms  14%    11× (Configuration) "highlight" Nunjucks Paired Shortcode +0ms
  Eleventy:Benchmark Benchmark      2ms   0%     1× (Aggregate) Configuration addPlugin +0ms
  Eleventy:Benchmark Benchmark      6ms   1%     2× (Aggregate) Searching the file system +0ms
  Eleventy:Benchmark Benchmark     17ms   2%     5× (Aggregate) Template Read +0ms
  Eleventy:Benchmark Benchmark      6ms   1%     5× (Aggregate) Template Compile +0ms
  Eleventy:Benchmark Benchmark      1ms   0%     1× (Aggregate) > Compile > ./demo/2020-04-20-swift-coding-challenge-2.md +0ms
  Eleventy:Benchmark Benchmark    677ms  70%     5× (Aggregate) Render +0ms
  Eleventy:Benchmark Benchmark     77ms   8%     1× (Aggregate) > Render > ./demo/2020-04-20-swift-coding-challenge-2.md +0ms
  Eleventy:Benchmark Benchmark     77ms   8%     1× (Aggregate) > Render > demo/_site/2020-04-20-swift-coding-challenge-2/index.html +0ms
  Eleventy:Benchmark Benchmark      1ms   0%     1× (Aggregate) > Compile > ./demo/file-with-liquid-tags.md +0ms
  Eleventy:Benchmark Benchmark    103ms  11%     1× (Aggregate) > Render > ./demo/file-with-liquid-tags.md +1ms
  Eleventy:Benchmark Benchmark    103ms  11%     1× (Aggregate) > Render > demo/_site/file-with-liquid-tags/index.html +0ms
  Eleventy:Benchmark Benchmark     94ms  10%     1× (Aggregate) > Render > ./demo/test-liquid.liquid +0ms
  Eleventy:Benchmark Benchmark     94ms  10%     1× (Aggregate) > Render > demo/_site/test-liquid/index.html +0ms
  Eleventy:Benchmark Benchmark      3ms   0%     1× (Aggregate) > Compile > ./demo/test-nunjucks.njk +0ms
  Eleventy:Benchmark Benchmark    133ms  14%     1× (Aggregate) > Render > ./demo/test-nunjucks.njk +0ms
  Eleventy:Benchmark Benchmark    133ms  14%     1× (Aggregate) > Render > demo/_site/test-nunjucks/index.html +0ms
  Eleventy:Benchmark Benchmark    269ms  28%     1× (Aggregate) > Render > ./demo/test-markdown.md +0ms
  Eleventy:Benchmark Benchmark    269ms  28%     1× (Aggregate) > Render > demo/_site/test-markdown/index.html +0ms
  Eleventy:Benchmark Benchmark      7ms   1%     5× (Aggregate) Template Write +0ms
  Eleventy:Benchmark Benchmark      7ms   1%     2× (Aggregate) Passthrough Copy File +0ms
[11ty] Copied 2 files / Wrote 5 files in 0.74 seconds (v1.0.2)

```