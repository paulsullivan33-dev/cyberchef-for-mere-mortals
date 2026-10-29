# What CyberChef Is

You have a blob of text that is not quite
readable: a string of letters and numbers
ending in `=`, a block of hexadecimal, a
token from a web request, a hash you need
to check. Somewhere underneath is ordinary
data, wrapped in one or more **encodings** —
ways of writing the same bytes in a safer
or more convenient alphabet. Unwrapping it
by hand means finding the right tool, the
right command, and the right flags, and
doing it again for every layer.
**CyberChef is that unwrapping, collected
into one page.**

CyberChef is a web application made by
**GCHQ**, the United Kingdom's signals
intelligence agency, and released as open
source (Apache 2.0 licence). Its own
nickname for itself is *the Cyber Swiss
Army Knife*, and that is fair: it holds
**several hundred operations** — encode,
decode, hash, compress, encrypt, parse,
convert — and lets you chain them into a
**recipe** that runs over your input in
one go. You paste data into its input box,
stack operations in the middle, and read
plain data in the output box. Chapter 4
walks through a first recipe end to end.

Two design facts explain most of what
follows in this guide, and both are worth
knowing before any recipe.

**It runs entirely in your browser.**
CyberChef is a **static web app**: a bundle
of HTML and JavaScript that, once loaded,
does all its work on your machine. When
you paste something into the official
online version, the data does not travel
to GCHQ's servers — there is effectively
no server side; your browser is the whole
machine. That is deliberate. The people
it was built for handle data they cannot
upload to a stranger's converter website,
and neither should you: an online
"free Base64 decoder" sees everything you
paste into it. CyberChef's answer is to
bring the tool to the data instead.
Chapter 9 shows how to keep a copy of
your own and run it offline.

**A recipe is data, and it can be shared.**
The chain of operations you build is
stored as a small JSON document, and
CyberChef can fold that document — and
even your input — into the page's URL.
A link can therefore carry a whole
worked example: open it and the recipe
is rebuilt, ready to bake. The same JSON
is what the scripting form of CyberChef
(chapter 3) consumes, so a recipe you
invent at the page can be run again from
a script.

One line needs drawing early, since this
is a tool for unwrapping data: **only
unwrap what is yours to unwrap.** Decoding
an encoding is arithmetic, not permission.
CyberChef will happily try keys, passwords
and ciphers on anything you paste, and
its running locally means nobody is
watching — which makes the rule yours to
keep, not the tool's to enforce. This
guide's examples use stock sample data
throughout: a pangram, a sample log line,
published hash test vectors.

## A first taste

This is the whole tool in miniature.
Feed CyberChef the input

```
VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==
```

and a recipe with one operation,
**From Base64**, and the output is

```
The quick brown fox jumps over the lazy dog
```

That is one operation, and the least
interesting one the tool has. The same
recipe idea stretches: chapter 8 takes
an input nobody identified in advance and
lets CyberChef's **Magic** operation work
out what it is; chapter 7 hashes a
sentence and checks the answer against
a published test vector; chapter 6 takes
a string wrapped in two encodings and
unwraps both in a single bake.

**Check:** with CyberChef open (chapter 3
shows the ways), run the taste above.
If the output is the sentence about the
fox, you have the whole mental model:
input, recipe, bake, output. Everything
else in this guide is variations on it.
