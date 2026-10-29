# Encodings and Decoding Chains

By the end of this chapter you will be
able to unwrap data that has been wrapped
twice — the normal case in the wild — and
to steer the common encodings' dialects
instead of being surprised by them. Every
operation here was run by the lab and
cross-checked against command-line tools
(transcript t01).

## Base64 and its dialects

**Base64** writes arbitrary bytes using
64 safe characters: `A–Z a–z 0–9 + /`,
with `=` as padding. It is an *encoding*,
not encryption — there is no key, and
anyone can read it back, which is rather
the point of this chapter.

CyberChef's **To Base64** and **From
Base64** take an **alphabet** argument
because the family has dialects:

- the standard alphabet above;
- a **URL-safe** one, swapping `+ /` for
  `- _`, used inside web addresses and
  JSON Web Tokens (chapter 8);
- others for particular systems, listed
  in the argument's drop-down.

Decoding with the wrong dialect mostly
works — until the data contains one of
the swapped characters, when it quietly
doesn't. If a decode produces output that
is *nearly* right, suspect the alphabet
before suspecting the data.

Two more arguments matter, both met in
chapter 4: **Remove non-alphabet chars**
(on by default — the decoder first throws
away anything outside the alphabet,
including the newlines in pasted text)
and **Strict mode** (off by default —
the decoder stops with an error instead
of tidying). The lab's junk test is the
extreme case: fed `!!! not base64 !!!`,
the lenient decoder skipped the junk and
decoded the remaining letters into
nonsense bytes; strict mode answered
`Base64 input contains non-alphabet
char(s)` and stopped (transcript t03).

## Hex and its delimiters

**Hex** writes each byte as two digits
from `0–9 a–f`: the pangram begins
`54 68 65` for `T`, `h`, `e`. CyberChef's
**To Hex** has a **delimiter** argument —
space, comma, `0x` prefix, or none —
because hex arrives in all those costumes
and the delimiter is presentation, not
meaning. **From Hex** accepts the same
range. The lab's round trip (transcript
t01):

```
The quick brown fox jumps over the lazy dog
54 68 65 20 71 75 69 63 6b 20 62 72 6f 77 6e ...
54686520717569636b2062726f776e...   (no delimiter)
```

and `od` produced the same digits from
the same sentence, independently.

## The chain: unwrapping twice

Real data is rarely wrapped once. Here is
the pangram after **To Base64** and then
**To Hex** — the lab's wrapped sample:

```
5647686c4948463161574e7249474a796233647549475a76654342716457317763794276646d56794948526f5a53427359587035494752765a773d3d
```

Unwrapping is the same list, backwards
and inverted: **From Hex**, then **From
Base64**. The lab baked exactly that pair
and got the sentence back, and confirmed
the wrapped form byte-for-byte with
`base64` and `od` on the command line
(transcript t03). The habit to build:
work from the outside in, one layer per
operation, and put a **breakpoint** after
each step (chapter 4) so you can watch
the data shed each wrapping. If a middle
layer surprises you — the hex decodes to
something that is plainly not Base64 —
the chain is wrong there, not at the end.

## URL encoding, honestly

**URL Encode** percent-encodes characters
that URLs cannot carry: a space becomes
`%20`. The trap is the default. With its
**Encode all special chars** argument off
(the default), CyberChef encodes *some*
characters and leaves others — the lab's
sample `salt & vinegar? 100%!` came out
as `salt%20&%20vinegar?%20100%!`, spaces
encoded but `&`, `?`, `%` and `!` left
bare. That is a deliberate choice (it
keeps a URL's own structure intact), but
if you are encoding a *value* to place
inside a URL, you want the argument on:

```
salt%20%26%20vinegar%3F%20100%25%21
```

**URL Decode** reverses either form. When
a downloaded recipe encodes something
"wrong", this argument is the first place
to look (transcript t01).

## ROT13 and Morse, briefly

**ROT13** shifts every letter 13 places
through the alphabet; applied twice it
undoes itself. Its arguments choose which
character sets rotate — lower case, upper
case, numbers — and by how much, which
makes it the general rotate-the-alphabet
operation wearing its most famous setting.
**To Morse Code** and **From Morse Code**
round-trip `SOS` as `... --- ...`, and
the family around them (Base32, Base58,
quoted-printable, HTML entities, Unicode
escapes) all behave the same way: one
operation each way, arguments for the
dialects (transcript t01).

**Check:** decode the double-wrapped
string above with the two-step recipe.
If the fox sentence appears, you can
chain — and chapter 8's Magic, which
builds chains like this by itself, will
read as a labour-saving device rather
than a mystery.
