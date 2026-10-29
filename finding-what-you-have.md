# Finding What You Have

By the end of this chapter you will be
able to hand CyberChef a string you
cannot identify and get a working
hypothesis back, read the contents of a
JSON Web Token without trusting it, and
take two quick measurements — frequency
and entropy — that say something real
about unknown data. All of it was run by
the lab on data it made itself
(transcript t04).

## Magic: the guesser

**Magic** examines its input and returns
a list of **candidate recipes** — its
ranked guesses at what the data is and
how to unwrap it. Its arguments are a
**depth** (how many layers down to keep
guessing; 3 by default), an **intensive
mode** that tries harder and slower, and
a language-support option.

The lab's three tests, with no hints
given:

- the pangram's Base64 form → first
  suggestion: **From Base64**, with the
  standard alphabet filled in;
- the pangram's hex form → first
  suggestion: **From Hex**;
- the lab's sample JWT → first
  suggestion: **JWT Decode**, with two
  candidate matches in total.

And at depth 2, handed the Base64-of-hex
double wrapping from chapter 6, Magic's
first recipe was the whole chain —
**From Base64**, then **From Hex** — the
same chain chapter 6 built by hand.

Read Magic's output as a ranked set of
hypotheses, not a verdict. It reports
what the data *could* be, in the order
it believes it; many strings could be
several things (a short hex string is
also valid Base64). Bake the top
candidate and *look* at the result —
readable output that makes sense is the
confirmation, and chapter 13 covers the
day Magic shrugs.

One scripting note: in the Node build,
Magic works when called directly (that
is how the lab ran it), but a recipe
*containing* Magic is refused by
`bake`, which classes it as flow control
— chapter 5's wrinkle again.

## JWTs: read first, trust separately

A **JSON Web Token** (JWT) is three
Base64URL pieces joined by dots: a
header, a payload of **claims** (named
facts like `sub`, the subject, and `exp`,
the expiry time), and a **signature**.
Tokens like this ride along with web
requests constantly, and the first thing
anyone wants to know is *what does this
one say?*

**JWT Decode** answers without judging:
it decodes the pieces and prints the
claims as JSON. The lab built its own
token in the transcript — header
`{"alg":"HS256","typ":"JWT"}`, claims
`{"sub":"sample-reader","purpose":"guide-demo","exp":1893456000}`,
signed with the sample key
`sample-secret-key` — and Decode returned
exactly those claims. The important
understanding: **decoding is not
verification.** Anyone can write any
claims into a token; Decode shows you
the writing.

**JWT Verify** is the separate step that
checks the signature against a key you
supply. Given the right key, it returned
the claims — now trustworthy ones. Given
a wrong key, the bake stopped with
`JsonWebTokenError: invalid signature`.
That is the whole security model in one
pair of results: the claims are public
reading; only the signature, checked
against a secret, makes them evidence.

## Frequency distribution: the shape of the letters

**Frequency Distribution** counts how
often each byte value occurs. On the
pangram (43 bytes) the lab read the
chart's data: space 18.60%, `o` 9.30%,
`e` 6.98%, down to single appearances at
2.33% — the unmistakable profile of
English text, where spaces and common
letters dominate. (The web app draws
this as a bar chart; the numbers above
are the chart's data, taken from the
scripting build.)

The working use is recognition. A
distribution with a few tall bars is
structured data — text, or text encoded.
A flat distribution — every byte about
equally likely — is data that has been
compressed or encrypted, and no amount
of decoding-chain guessing will make it
readable without the key or the format.

## Entropy: one number for the same idea

**Entropy** (labelled *Shannon Entropy*
in some lists) compresses that shape
into a single number: bits of
unpredictability per byte, from 0
(totally predictable) towards 8 (a
perfectly even spread). The lab's
measurements:

```
the pangram itself      4.43
its Base64 form          4.95
its hex form             3.28
```

Hex scores lowest because it spends a
whole byte on each half-byte of
information — 16 symbols where 256 are
possible. Base64, packing more per
character, scores higher; English, with
all its habits, sits in between. Unknown
data near 8 is behaving like noise —
compressed, encrypted, or actually
random — and near the text range is
worth trying decoders on. Entropy does
not identify anything; it tells you
where identification is worth attempting.

**Check:** paste the chapter 6
double-wrapped string into a fresh
CyberChef, run **Magic** at its default
depth, and bake its first suggestion.
The fox sentence — reached without you
naming a single operation — is the
chapter's whole argument.
