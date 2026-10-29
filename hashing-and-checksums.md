# Hashing and Checksums

By the end of this chapter you will be
able to fingerprint a piece of text four
ways, check a fingerprint against the
ones the standards bodies publish, and —
the everyday job — verify that a file
someone sent you hashes to the value
they announced. Every hash here was run
by the lab and compared with a published
vector or a system tool (transcript t02).

## What a hash is

A **hash function** takes any amount of
data and returns a fixed-length
fingerprint — a **digest** — with three
properties that matter in practice: the
same input always gives the same digest;
a one-bit change in the input scrambles
the digest completely; and you cannot
run it backwards to recover the input.
A **checksum** is a hash's smaller
cousin: it catches accidents (a garbled
download) but not enemies.

## The operations, against the record

**MD5** (128-bit digest) on the test
string `abc`:

```
900150983cd24fb0d6963f7d28e17f72
```

That is the value RFC 1321 — the document
that defines MD5 — prints as its test
result, and CyberChef matched it exactly.
On the pangram, CyberChef's MD5,
`9e107d9d372bb6826bd81d3542a419d6`, also
matched the system's `md5sum`.

**SHA1** (160-bit) on the pangram:

```
2fd4e1c67a2d28fced849ee1bb76e7391b93eb12
```

the widely published value, matched.

**SHA2** is a family, and its **size**
argument chooses the member: 224, 256,
384 or 512. Two of the lab's results:

```
SHA-256 of "abc":
ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad

SHA-256 of the pangram:
d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592
```

The first is the test vector published by
NIST, the US standards body; the second
is the pangram's famous digest. Both
matched, and `sha256sum` agreed with the
second. One trap, found by the lab the
honest way: **the size argument defaults
to 512**, so a reader who adds SHA2 and
bakes gets a 128-hex-digit digest that
will *never* match the 64-digit SHA-256
value they were given to check. If a hash
"doesn't match", count the digits first
(transcript t02; chapter 13 returns to
this).

**SHA3** is the newer family, selected
the same way; the lab ran its 256 size
on the pangram and recorded the result
in the same transcript.

## The everyday job: checking a download

Software publishers announce a file's
SHA-256 next to the download. To check:
load the file as CyberChef's **input**
(the file button on the input pane),
apply **SHA2** with size **256**, and
compare the output with the announced
value — character for character; the
lab's checks above are the same
comparison, with system tools standing
in for the publisher. Equal means the
bytes you have are the bytes they
announced. Unequal means stop: truncated
download, wrong file, or worse.

## Checksums, and choosing one

**CRC Checksum** implements the CRC
family used by archives and protocols.
It has an **algorithm** argument, and it
must be set: the lab ran it on the
pangram with **CRC-32** chosen and got
`414fa339`, the value Python's `zlib`
computes independently. Left on its
default — **Custom**, which waits for
you to type parameters — it stops with
`Invalid custom CRC arguments`. That
error reads like a failure and is really
a question: *which CRC did you mean?*
(transcript t02).

## What hashes cannot do

MD5 and SHA1 are **broken** as security
fingerprints: researchers can craft two
different files with the same digest.
They remain fine as accident detectors —
which is why they still appear in the
wild — but for "is this the real file?",
use SHA-256 or better, and remember what
even a perfect hash proves: that your
bytes match *an announced digest*. If
the announcement itself was tampered
with, the match proves nothing. A hash
is a fingerprint, not a signature;
chapter 8's JWT verification shows the
difference, since there a secret key is
involved.

**Check:** hash `abc` with SHA2 at size
256 and compare with the NIST vector
printed above. If they match, you can
trust your hashing hand — and you have
the digit-counting habit for the day a
publisher's value refuses to agree.
