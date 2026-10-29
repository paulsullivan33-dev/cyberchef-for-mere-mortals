# CyberChef for Mere Mortals

Sooner or later, data arrives wrapped: a
string ending in `=` that is plainly not
meant to be read as-is, a block of hex, a
token from a web request, a hash you are
told to check a download against.
Unwrapping it usually means hunting for
the right little tool — a decoder site
here, a command with the right flags
there — and doing it again for every
layer. **CyberChef** is the unwrapping
collected into one place: a single web
page, made by **GCHQ** and released as
open source, holding several hundred
small operations — encode, decode, hash,
compress, parse, convert — that you
chain into a **recipe** and run over your
data in one go.

One property explains why this tool, of
all converters, earned its place. It
runs **entirely in your browser**: the
page is a static bundle of files, and
once it has loaded, your data never
leaves your machine. Every "free online
decoder" on the internet reads whatever
you paste into it; CyberChef was built
by people whose data could not take that
trip, and it shows. You can use the
official hosted copy, download the same
files and serve them yourself, or run
the operations from a script — and this
guide covers all three.

The lab behind this guide ran the real
thing: **CyberChef 11.5.0**, both as the
official release download (unzipped,
served locally, and checked page by
page) and as the Node scripting package,
on a small Linux machine. Against it the
lab encoded and decoded a pangram in
Base64 and hex and checked every result
against the command-line tools; hashed
test strings and compared the digests
with the values the standards publish —
an RFC test vector, a NIST test vector;
built a JSON Web Token from scratch and
decoded and verified it; handed the
**Magic** operation wrapped data with no
hints and read its guesses; baked
multi-step recipes whose outputs were
recomputed independently; and
deliberately broke things: junk fed to a
lenient decoder, strict mode switched
on, a checksum with no algorithm chosen,
a flow-control recipe handed to a build
that refuses flow control.

What the lab could not do, it did not
fake. It had no browser to click with,
so the page's drag-and-drop itself —
dragging operations into a recipe,
breakpoints pausing a bake on screen —
is taught from the tool's documented
behaviour and labelled as such wherever
it appears; the *operations* behind those
gestures are the very ones the lab ran.
`criteria.md` keeps the full ledger of
what was run and what was only read.

One rule belongs up front, because this
is a tool for unwrapping data: **only
unwrap what is yours to unwrap.**
Decoding is arithmetic, not permission,
and a tool that runs locally has no one
watching. This guide's examples are
stock sample data throughout — a
pangram, published test vectors, a token
the lab signed itself.

## What this guide covers

- [**What CyberChef is**](what-cyberchef-is.md) —
  the mental model: input, recipe, bake,
  output; why running in your browser is
  the feature; and the ethics line, drawn
  early
- [**The moving parts**](the-moving-parts.md) —
  operations, recipes, the input and
  output panes, and the dish that carries
  your data (and its type) between steps
- [**Installing CyberChef**](installing-cyberchef.md) —
  the hosted page, the release download
  served yourself, and the Node package,
  with the check that proves you have the
  real tool
- [**Your first recipe**](your-first-recipe.md) —
  one Base64 decode, end to end, then
  backwards; disable, breakpoint,
  arguments, and the strict-mode error
- [**The recipe model**](the-recipe-model.md) —
  recipes as JSON and as links, running
  them from scripts, and where flow
  control lives (and where it refuses to)
- [**Encodings and decoding chains**](encodings-and-decoding.md) —
  Base64's dialects, hex delimiters, the
  two-layer unwrap, URL encoding's
  argument trap, ROT13 and Morse
- [**Hashing and checksums**](hashing-and-checksums.md) —
  MD5, SHA1, SHA2 and SHA3 against the
  published vectors, checking a download,
  CRC checksums, and what a hash cannot
  prove
- [**Finding what you have**](finding-what-you-have.md) —
  Magic's ranked guesses, reading and
  verifying JWTs, frequency distribution,
  and entropy — four ways to interrogate
  unknown data
- [**Self-hosting CyberChef**](self-hosting-cyberchef.md) —
  keeping your own copy: serving the
  folder, working offline, updating by
  replacement, and why pinning a version
  matters
- [**Recipes**](recipes.md) — unwrap a
  double-wrapped string, identify a
  mystery blob, check a download, read a
  token, convert timestamps, and encode a
  value for a URL
- [**The neighbours**](the-neighbours.md) —
  the command-line twins (`base64`,
  `sha256sum`), jq for JSON, the text
  toolkit for volume, openssl for real
  cryptography — and when each beats the
  page
- [**Limits**](limits.md) — browser
  memory, lenient nonsense, hash
  over-claims, Magic's fallibility, the
  scripting build's subset, and why
  decoding is not decrypting
- [**Troubleshooting**](troubleshooting.md) —
  silent garbage, strict-mode errors,
  hashes that never match, the CRC
  question-error, refused recipes, and
  blank self-hosted pages
- [**Glossary**](glossary.md) — the
  terms, collected in one place

## What it doesn't cover

Cryptography as a practice — generating
keys, encrypting data you will rely on,
certificates. CyberChef *inspects* crypto
happily, and this guide verifies a token
signature, but production crypto belongs
to dedicated tools (the OpenSSL guide in
this series). Malware analysis and
forensics as disciplines: CyberChef is a
bench tool both fields use, and this
guide teaches the bench, not the fields.
Writing new operations, and the
developer's side of the project, are
out of scope. And cracking — getting
into data you have no right to — is out
in every sense; the line in chapter 1
applies to the whole book.

## How to use this guide

Read chapter 1 for the model and
chapter 2 before installing anything —
knowing which part is which turns later
confusion into a named problem.
Chapters 3 and 4 get you the tool and
your first baked recipe in one sitting.
Chapters 5 to 8 are the working core:
how recipes travel, the encodings, the
hashes, and the interrogation tools.
Chapter 9 is for when you decide the
tool is a keeper. The lab's transcripts
live in `cyberchef-lab/transcripts/` and
its scripts beside them; when a chapter
quotes a result, the transcript is the
evidence.

---

## Part of the series

This guide is one of the [For Mere Mortals](https://paulsullivan33-dev.github.io/mere-mortals/) guides: plain-language guides to the tools programmers and makers use.

Related guides:

- [jq for Mere Mortals](https://paulsullivan33-dev.github.io/jq-for-mere-mortals/)
- [Text Processing for Mere Mortals](https://paulsullivan33-dev.github.io/text-processing-for-mere-mortals/)
- [OpenSSL for Mere Mortals](https://paulsullivan33-dev.github.io/openssl-for-mere-mortals/)

## License

The writing in this guide is licensed under [CC BY 4.0](https://github.com/paulsullivan33-dev/cyberchef-for-mere-mortals/blob/main/LICENSE). Code examples and lab scripts are licensed under the [MIT License](https://github.com/paulsullivan33-dev/cyberchef-for-mere-mortals/blob/main/LICENSE-CODE).
