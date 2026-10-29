# Troubleshooting

The failures this guide's lab actually
met, plus the ones its verified results
predict. Each entry is the symptom, the
cause, and the fix — in that order,
because that is the order you meet them.

## The output is strange bytes, and no error appeared

**Cause:** a lenient decoder met input
that was not what the recipe assumed.
It skipped the characters outside its
alphabet and decoded what remained —
the lab fed a From Base64 the string
`!!! not base64 !!!` and got nonsense
bytes, silently (transcript t03).
**Fix:** turn on the operation's
**Strict mode** argument and bake again.
Now the same input fails loudly, which
is the truth. Then ask the upstream
question: what *is* this input? Magic
(chapter 8) is the quickest way to ask.

## "Base64 input contains non-alphabet char(s)"

**Cause:** strict mode is on and the
input contains something outside the
chosen alphabet — dirt from copying, a
URL-safe string decoded with the
standard alphabet, or padding that was
chopped off in transit (the lab's
unpadded pangram fails strict mode with
exactly this message; transcript t03).
**Fix:** check the **alphabet** argument
first — JWTs and URLs use the URL-safe
dialect. Then decide whether the input
is merely untidy (go lenient, and read
the output suspiciously) or actually
wrong (stop).

## A hash never matches the published value

**Cause:** almost always one of two.
The **size** argument is wrong — SHA2
defaults to 512, so its output has 128
hex digits against the publisher's 64 —
or your input has a trailing newline
the publisher's did not (the lab's
checks were run with `printf %s`, no
newline, for exactly this reason).
**Fix:** count the digits, set the size,
and in the page, check for a stray blank
line at the end of the input.
(Transcript t02.)

## "Invalid custom CRC arguments"

**Cause:** the **CRC Checksum**
operation's algorithm is set to
**Custom** — its default — with no
parameters supplied. It is asking which
CRC you mean, in error language.
**Fix:** choose a named algorithm
(CRC-32 for the common case) in the
argument. The lab's CRC-32 result
matched an independent implementation.
(Transcript t02.)

## A recipe works in the page but the script refuses it

**Cause:** the recipe contains a
flow-control operation. The Node build
says so directly — `Sorry, the Fork
operation is not available in the
Node.js version of CyberChef`, and a
recipe containing Magic is refused as
flow control too (transcript t03, and
the Magic note in chapter 8).
**Fix:** keep steering in the page, or
restructure: let your script do the
looping and branching, and call
`bake` (or the individual operations)
for the transformations, which travel
freely.

## Your own hosted copy shows a blank or half-drawn page

**Cause:** the assets did not come
along. The release is a folder, not a
file: the page loads `assets/` and
`modules/` from beside itself, and a
server (or a copy) that kept only the
HTML has nothing to run.
**Fix:** serve the whole unzipped
folder, and confirm the main script
answers — the lab's check fetched
`assets/main.js` and expected its full
13.6 MB (transcript t00).

## Magic lists several recipes and the first is wrong

**Cause:** the data genuinely fits more
than one reading — short strings often
do — and Magic ranks by likelihood, not
by knowledge.
**Fix:** bake each candidate and *read*
the outputs; the right unwrapping is
the one whose result is meaningful all
the way through, not just printable at
the start. Raising Magic's **depth**
helps when the right answer is wrapped
twice; enabling **intensive mode** is
the slower, broader search. Chapter 8's
check is the drill.

## The bake is slow, or the tab gives up

**Cause:** the input is large and the
work is happening in browser memory,
possibly with an operation whose cost
grows faster than the input does.
**Fix:** work on a sample first — the
first hundred lines of the log, not the
whole archive — and take the finished
recipe to the scripting build or to
chapter 11's command-line neighbours
for the full volume.
