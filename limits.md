# Limits

What CyberChef cannot do, or does in a
way that will bite if you lean on it.
Each limit here was either met by the
lab or is a property of how the tool is
built; `criteria.md` says which is which.

**It is a browser page, with a browser's
limits.** All processing happens in your
browser's memory, on the one machine.
Multi-hundred-megabyte files will crawl
or fail; there is no server to hand the
weight to, because "no server" is the
design. For bulk work over many files,
chapter 11's neighbours are the tool.

**Lenient decoders produce confident
nonsense.** The default decoders tidy
defective input instead of refusing it,
and the extreme case is real: junk input
became junk bytes that *looked* like a
successful decode (chapter 4, transcript
t03). Any pipeline that consumes decoder
output unseen needs strict mode switched
on deliberately, per operation.

**A hash match is not proof of origin.**
Chapter 7's caveat, repeated because it
is the limit people actually get hurt
by: MD5 and SHA1 digests can be forged
by construction, and even SHA-256 only
proves your bytes match an announcement.
CyberChef computes fingerprints; it does
not sign, and cannot vouch.

**Magic proposes, it does not know.**
Its candidates are ranked guesses from
the data's shape. Short or ambiguous
inputs get several candidates, and the
top one can be wrong — the confirmation
is always a human reading the baked
output. Treat Magic as a very fast
colleague's first idea.

**The scripting build is a subset.** The
Node package refuses flow-control
operations in recipes — Fork, and Magic
inside a bake, among them (met by the
lab; chapter 5) — so not every page
recipe can be automated as-is. A recipe
that must run from a script has to be
built from transforming operations, or
restructured so the script does the
steering itself.

**Decoding is not decrypting.** Most of
this guide is *encodings* — keyless,
reversible by design. Where data is
*encrypted*, CyberChef will apply a
cipher happily, but without the right
key and settings the output is noise,
and no operation in the list can change
that. Brute-force helpers exist for a
few weak schemes; they are not a way
into properly encrypted data.

**Nothing is kept.** CyberChef has no
accounts, no history worth the name, no
files of yours. Close the tab and the
work is the recipe JSON you saved — or
gone. That is a privacy feature wearing
a limitation's clothes, and chapter 5's
save habit is the compensation.

**Versions differ.** Arguments, defaults
and even operation names move between
releases (this guide is written against
11.5.0). A recipe from the internet may
name things your copy spells differently,
and the hosted page can update beneath
a recipe you rely on — the self-hosting
chapter's pinning argument, arriving by
the back door.
