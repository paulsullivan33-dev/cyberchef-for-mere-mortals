# Glossary

**Argument** — a setting on an operation:
the alphabet for Base64, the size for
SHA2, the strict-mode switch. Shown
under the operation in the recipe, and
stored as the `args` list in the
recipe's JSON.

**Auto-bake** — the page's habit of
re-running the recipe as you type or
edit, so the output is usually already
there. Can be switched off for large
inputs or deliberate stepping.

**Bake** — one run of a recipe over an
input, producing the output. Also the
name of the scripting build's function
that runs a whole recipe.

**Base64** — an encoding that writes
bytes with 64 safe characters plus `=`
padding. Comes in dialects (standard,
URL-safe); reversible by anyone, key
not involved.

**Breakpoint** — a mark on an operation
in a recipe: the bake pauses after it,
showing the data's state at that step.

**Checksum** — a small fingerprint meant
to catch accidents — a garbled transfer,
a flipped bit. CRC is the common family.
Catches mistakes, not enemies.

**Claims** — the named facts inside a
JWT's payload: `sub` (who it concerns),
`exp` (when it expires), and whatever
the issuer added.

**Digest** — the output of a hash
function; the fingerprint itself.

**Dish** — CyberChef's internal
container for the data being worked on,
which also records its type (bytes,
string, JSON, file…) so operations can
convert honestly between steps.

**Encoding** — a reversible way of
writing the same bytes in a different
alphabet or shape: Base64, hex, URL
encoding. Not encryption; there is no
key and no secrecy.

**Entropy** — a measure of how
unpredictable data is, bit per byte.
Text sits mid-range; compressed or
encrypted data approaches the maximum,
8.

**Flow control** — the operations that
steer a recipe instead of transforming
data: Fork, Merge, Register, Jump,
Conditional Jump, Return. Available in
the web app; refused by the scripting
build's `bake`.

**Frequency distribution** — a count of
how often each byte value occurs in the
input, drawn as a chart in the app. The
shape betrays text, and its absence
betrays compression or encryption.

**Hash function** — a one-way function
producing a fixed-length digest from any
input: same input, same digest; changed
input, unrecognisably different digest;
no way back.

**Hex (hexadecimal)** — writing each
byte as two digits from `0–9 a–f`. The
delimiter (spaces, commas, none) is
presentation, not meaning.

**JWT (JSON Web Token)** — a signed
bundle of claims in three Base64URL
pieces: header, payload, signature.
Decoding shows the claims; only
verifying the signature makes them
trustworthy.

**Magic** — the operation that guesses
what encoded data is and proposes
candidate recipes, ranked. A hypothesis
machine, not an oracle.

**Operation** — one small tool in
CyberChef's list: encode, decode, hash,
parse, convert. Several hundred of them,
each doing one job.

**Recipe** — an ordered list of
operations the input flows through.
Stored as JSON; shareable as a file or
inside a link.

**Strict mode** — an argument on several
decoders: refuse defective input with an
error instead of tidying it silently.

**Static web app** — a program made of
files a browser downloads and runs
locally, with no server-side processing.
CyberChef is one; it is why your data
never leaves your machine.
