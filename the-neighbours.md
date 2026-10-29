# The Neighbours

By the end of this chapter you will know
when to reach for the command line
instead — because most of CyberChef's
everyday operations have a shell twin,
and the shell wins whole categories of
work. This guide's lab used the twins as
its referees: every cross-check in the
transcripts is one of these tools.

## The checksum and encoding twins

The coreutils on any Linux or macOS
machine already speak the common
encodings and hashes:

```
printf %s "The quick brown fox jumps over the lazy dog" | base64
printf %s "The quick brown fox jumps over the lazy dog" | sha256sum
printf %s "abc" | md5sum
```

These are the exact commands the lab
checked CyberChef against (transcripts
t01 and t02 — agreement, every time).
For one operation on one small input,
the shell is faster to reach than a
browser tab. CyberChef pulls ahead the
moment the job is a *chain*, a *guess*,
or a *dialect*: three commands' worth of
piping and flag-hunting is one recipe,
and Magic has no shell twin at all.

## jq, for data that is already JSON

CyberChef parses JSON — it can decode a
JWT's claims, format JSON prettily,
query it. But when the data starts as
JSON and the job is reshaping it —
selecting fields, filtering lists,
building new documents — the dedicated
tool is **jq**, and this series' *jq for
Mere Mortals* teaches it properly. The
dividing line: CyberChef treats JSON as
one format among hundreds, on data that
usually is not JSON yet; jq treats JSON
as the whole world.

## The text-processing toolkit

For work that is *streams of text* —
every line of every log in a folder,
a column out of a report, a pattern
replaced across a tree of files — the
shell's text tools (`grep`, `sed`, `awk`
and family, taught in this series' *Text
Processing for Mere Mortals*) are built
for the volume in a way a paste-into-a-
box tool is not. CyberChef does have a
Find/Replace and regular expression
operations for the single blob in front
of you; the toolkit is for the thousand
blobs behind it.

## openssl, for real cryptography

CyberChef includes ciphers — AES, DES
and friends — and they are genuinely
useful for decoding a captured blob or
testing a known key. For *doing*
cryptography as a practice — generating
keys, certificates, signing, encrypting
things you will rely on — the neighbour
is **openssl**, taught in this series'
*OpenSSL for Mere Mortals*. The line is
the same as JWT Decode versus Verify in
chapter 8, widened: CyberChef inspects
and experiments; the dedicated tools are
where production crypto belongs.

## A script of your own

Finally, the neighbour this guide used
most: a general-purpose language. The
lab's JWT was *built* in twenty lines of
Node with the standard `crypto` library,
and Python's `zlib` refereed the CRC
check. When a job is bespoke — a format
nobody's toolbox knows — writing the
twenty lines beats hunting through
several hundred operations. CyberChef's
own scripting package (chapter 3) sits
between the two: your script, its
operations.

**Check:** take any recipe from chapter
10 and name, out loud, the shell command
or tool that would do the same job. If
you can, you understand the boundary —
and you will pick the right side of it
without thinking, which is the chapter's
whole purpose.
