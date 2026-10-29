# Recipes

Seven jobs, each a recipe you can build
in the page or run as JSON from chapter
5. Every operation named here was run by
this guide's lab; where a step lives
only in the page, the recipe says so.

## 1. Unwrap a string wrapped twice

**Given:** data encoded as Base64, then
the result written in hex:

```
5647686c4948463161574e7249474a796233647549475a76654342716457317763794276646d56794948526f5a53427359587035494752765a773d3d
```

**Recipe:** From Hex → From Base64.
**Result:** `The quick brown fox jumps
over the lazy dog`. Work outside-in, one
layer per operation, and let breakpoints
show you each stage. (Transcript t03,
cross-checked with `base64` and `od`.)

## 2. Identify a string you cannot place

**Given:** an unknown blob.
**Recipe:** Magic, default depth.
**Result:** a ranked list of candidate
recipes. Bake the first; if the output
is readable and makes sense, you are
done. If not, try the next candidate —
Magic offered the lab two candidates for
a JWT and put the right one first.
(Transcript t04.)

## 3. Check a download against its announced hash

**Given:** a file, and the SHA-256 its
publisher announced.
**Recipe:** load the file as input →
SHA2, size **256**.
**Result:** a 64-digit digest. Compare
every character with the announced one.
Match: proceed. Mismatch: do not —
and count the digits before concluding
anything, since the size argument
defaults to 512. (Transcript t02.)

## 4. Read a token, then verify it

**Given:** a JWT from a request you are
debugging.
**Recipe (reading):** JWT Decode — the
claims print as JSON.
**Recipe (trusting):** JWT Verify, with
the key, if the token is yours to check.
**Result:** decode always answers; verify
answers only when the signature is
genuine — a wrong key stopped the lab's
bake with `invalid signature`.
(Transcript t04.)

## 5. Make timestamps in a log readable

**Given:** lines of UNIX timestamps, one
per line.
**Recipe (in the page):** Fork (split on
newline) → From UNIX Timestamp.
**Result:** each line converted in place.
Fork is a page-only step — the scripting
build refuses it — but the conversion
itself checked out standalone in the
lab: 978346800 → Monday 1 January 2001,
11:00:00 UTC, agreeing with the `date`
command. (Transcript t03.)

## 6. Disguise a note lightly, and undisguise it

**Given:** text you want unreadable at a
glance — a puzzle, a spoiler, a hint.
**Recipe:** ROT13. The same recipe again
undoes it.
**Result:** `Meet at the park gate`
becomes `Zrrg ng gur cnex tngr` and back.
This is a parlour trick, not secrecy:
anyone with this chapter can reverse it.
(Transcript t01.)

## 7. Encode a value for safe passage in a URL

**Given:** a value containing spaces,
`&`, `?`, `%` — characters a URL reads as
instructions.
**Recipe:** URL Encode, with **Encode
all special chars** switched on.
**Result:** `salt & vinegar? 100%!`
becomes `salt%20%26%20vinegar%3F%20100%25%21`,
safe to sit inside a query string. The
argument is the recipe; with it off, the
same operation leaves the dangerous
characters bare. (Transcript t01.)
