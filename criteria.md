# Writing criteria for this guide

Every "for Mere Mortals" guide is written to the same nine-point
standard, so a reader who trusts one can trust the rest. Here it
is, with the verification notes for this particular guide below.

1. **Fix it first.** Reader outcomes lead, not action items: each
   chapter opens by naming the outcome it delivers, shows a check
   the reader can run to confirm they got it, and a reasonable
   reader finishes able to state what was done, what it means,
   and what to try next.
2. **Plain language.** Short sentences, everyday vocabulary,
   technical terms defined on first use. No slang, and no
   idioms that only make sense in one country — the reader may
   be translating as they go.
3. **No dead ends.** A guide never tells the reader to do
   something it cannot show them how to verify. Every claim a
   reader relies on — an install, a command, an output — is
   something this guide demonstrates or clearly labels
   documented-only below.
4. **Live-verified where it matters.** Procedures are run for
   real in the guide's lab wherever the build machine allows it,
   and the transcripts kept in the repository are the evidence.
   What could not be run is listed honestly below, never
   presented as if it had been.
5. **General audiences.** Nothing in this guide — examples,
   fixtures, names, addresses — is modelled on any particular
   reader or author's real life, network, or organisations.
   The lab's sentences are stock sentences and pangrams.
6. **Standalone.** A reader needs this guide, its lab, and
   nothing else. Where another guide would genuinely help, it
   is pointed to once, by name, and the chapter still completes
   without it.
7. **Honest about limits.** Chapter 12 names what the tool
   cannot do: browser memory bounds the work, lenient decoders
   produce confident nonsense, a hash match is not proof of
   origin, Magic's candidates are guesses, the scripting build
   refuses flow control, and decoding is not decrypting.
8. **The ethics rule is in the text, early.** CyberChef is a
   tool for unwrapping data, so chapter 1 and the README draw
   its line plainly — only unwrap what is yours to unwrap;
   decoding is arithmetic, not permission — and the privacy
   property the tool exists for (your data stays on your
   machine) is stated before any procedure depends on it.
9. **Builds clean.** The site builds with MkDocs in strict mode
   with no warnings, and a fresh reader following the chapters
   in order reaches the stated outcome of each.

## Verification notes for this guide

The build machine is a 2-CPU, 7.7 GB Ubuntu 24.04 sandbox,
shared with other work while the lab ran. CyberChef **11.5.0**
was verified in two forms: the official release archive
(`CyberChef_8cd426dd4f40f1423912d5fad91b578a86a65112.zip`,
unpacked and served locally) and the `cyberchef` Node package
at the same version, whose operation functions and `bake`
runner executed every operation test. The lab scripts are in
`cyberchef-lab/` beside the transcripts they produced.

One disclosure about the Node route: in this sandbox the
package's stock install failed in its grunt-based install
script. The lab installed with `--ignore-scripts`, added the
`terser` package (an optional dependency the node build
imports at startup), and added `.mjs` extensions to 42
extensionless import lines inside the `crypto-api`
sub-dependency, which Node's module loader refuses as shipped.
No CyberChef operation code was altered; the repairs touched
import plumbing in the lab's own `node_modules` only, and
transcript t05 records the steps as run. On an ordinary
machine none of this is expected to be necessary.

Run for real, with transcripts as evidence:

- The release archive unpacked: page
  `CyberChef_v11.5.0.html`, pre-compressed `index.html.gz`/`.br`
  copies, `assets/` and `modules/` folders; served with
  Python's `http.server`; page answered HTTP 200 with title
  `CyberChef`, and `assets/main.js` served in full at
  13,616,390 bytes. The gzip copy carries the same title. The
  hosted page at gchq.github.io/CyberChef answered with the
  same title. The release page's own built-in example links
  were read out of it: four links in `#recipe=...&input=...`
  form (t00, t05).
- Encodings (t01): To/From Base64 round trip on the pangram;
  To/From Hex with space and no delimiters, matching `od`
  independently; `base64` on the command line matching
  CyberChef's output exactly; URL Encode in both argument
  settings (default leaves `& ? % !` bare; "Encode all special
  chars" encodes them) and URL Decode round trip; ROT13 both
  directions; Morse round trip on SOS.
- Hashing (t02): MD5 of `abc` matching the RFC 1321 test
  value; MD5 and SHA-256 of the pangram matching `md5sum` and
  `sha256sum`; SHA1 of the pangram matching the published
  value; SHA2 of `abc` at size 256 matching the NIST test
  vector; SHA2's default size shown to be 512 (its output
  matching `sha512sum`); SHA3 at size 256; CRC Checksum with
  CRC-32 matching Python `zlib.crc32` (`414fa339`); CRC
  Checksum left on its Custom default failing with `Invalid
  custom CRC arguments`.
- Recipes (t03): `bake` running [To Base64, To Hex] with the
  output recomputed independently by `base64` and `od`;
  the reverse recipe [From Hex, From Base64] recovering the
  pangram; a recipe printed as JSON, parsed back, and baked
  from the parsed copy with output identical to direct calls;
  From UNIX Timestamp agreeing with the `date` command;
  strict-mode From Base64 refusing junk and unpadded input
  with `Base64 input contains non-alphabet char(s)`, while
  lenient mode decoded the same junk into nonsense bytes.
- Analysis (t04): a JWT constructed in the lab (HS256, sample
  key, generic claims) and JWT Decode returning exactly those
  claims; JWT Verify returning the claims with the right key
  and stopping with `invalid signature` for a wrong one;
  Magic identifying Base64, hex, and the JWT (first
  suggestions From Base64, From Hex, JWT Decode; two
  candidates for the JWT) and, at depth 2, proposing the full
  From Base64 → From Hex chain for doubly wrapped data;
  Frequency Distribution data for the pangram (space 18.60%,
  `o` 9.30%, `e` 6.98%); Shannon Entropy of the pangram
  (4.4320), its Base64 form (4.9505) and its hex form (3.2838).

Documented only — described from the project's own material
and the behaviour of the verified engine, not clicked through,
and the text does not claim otherwise:

- The page's hands-on interactions: dragging operations into
  a recipe, auto-bake as you type, breakpoints pausing a bake
  on screen, loading input from a file and saving output to
  one, the Save/Load recipe buttons. The lab had no browser
  to drive; the operations those gestures invoke are the ones
  verified above. The hosted page beyond its title check is
  the same application as the verified release.
- Flow-control operations in action (Fork, Merge, Register,
  Jump, Conditional Jump): the Node build refuses them
  outright — its message is quoted in chapter 5 from a real
  run — so their worked use in the page (including the app's
  own shipped Fork example) is documented-only here.
- Operations beyond the verified set: encryption/decryption
  operations, compression, image and media operations, and
  the several hundred others are characterised by category,
  not individually run.
- Opening the release page directly from disk (file://),
  which the text offers as a route: plausible from the
  verified layout, not exercised in this sandbox.
- Renaming the versioned HTML to `index.html` in a self-hosted
  copy: the page's asset references are relative (seen in the
  served copy), but the rename itself was not re-served and
  re-checked by the lab.

Fixtures are this guide's own and deliberately generic: a
pangram, the string `abc` (the standards' own test input), a
kitchen-flavoured sample phrase for URL encoding, three
sample UNIX timestamps, and a JWT the lab built and signed
with a sample key over generic claims — no names,
organisations or real events. Nothing in the lab touched
anyone else's data.
