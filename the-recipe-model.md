# The Recipe Model

By the end of this chapter you will be
able to take a recipe out of the page —
as JSON, as a link — and put it back, and
to run the same recipe from a script.
This is the chapter that turns CyberChef
from a scratchpad into a tool you can
build habits on.

## A recipe is a JSON document

Underneath the drag-and-drop, a recipe
is a list of operations with their
arguments, written as **JSON**. The
recipe from transcript t03 — Base64, then
ROT13 — is this, in full:

```json
[{"op": "To Base64", "args": ["A-Za-z0-9+/=", true]}, {"op": "ROT13"}]
```

Read it left to right: each entry names
an operation (`op`) and the values of its
arguments (`args`), in the order the
arguments appear under the operation in
the page. An operation whose arguments
you have not touched can travel as its
name alone, or with defaults filled in.

The page's **Save recipe** button offers
this JSON (to a file, or in the URL —
next section), and **Load recipe** reads
it back. The lab round-tripped it the
hard way: printed a recipe as JSON,
parsed the text back into data, and baked
from the parsed copy. The output matched
calling the operations directly, byte for
byte (transcript t03). So a recipe in an
email, a wiki page, or a ticket is not a
screenshot of a recipe — it *is* the
recipe.

## A recipe can ride inside a link

CyberChef can also fold the recipe — and,
if you let it, the input — into the
page's address, after the `#`:

```
https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true)&input=...
```

That is not a made-up example shape: the
release's own front page carries links in
exactly this form for its built-in
examples (the lab read them out of the
downloaded page, transcript t00's
neighbourhood). Whoever opens such a
link gets your recipe rebuilt, ready to
bake. Two cautions belong with the
convenience: the link can be long —
browsers and chat tools truncate — and
anything you fold into it, including the
input, is visible to anyone who sees the
link. Share the recipe freely; think
before sharing the data inside it.

## Running recipes from a script

The Node package from chapter 3 runs the
same JSON through its `bake` function:
hand it input text and the recipe list,
and it returns the output dish. The lab's
scripts in `cyberchef-lab/` are this,
over and over: the two-layer unwrap of
chapter 6, for instance, is

```js
await bake(wrapped, ["From Hex", "From Base64"])
```

in a script — no browser involved. This
is the route for repeated work: last
week's recipe, run over today's data, by
a machine, at 3 a.m. The page is for
figuring out; the script is for doing
again.

## Flow control, and where it lives

Chapter 2 named the steering operations:
**Fork**, **Merge**, **Register**, **Jump**,
**Label**, **Conditional Jump**, **Return**.
In the web app they make recipes that
work line by line or branch on what the
data looks like. The app's own shipped
examples show the shape — one of them
runs **Fork** over lines of UNIX
timestamps so that **From UNIX Timestamp**
can convert each line separately (a
conversion this lab verified on its own:
978346800 is Monday 1 January 2001,
11:00:00 UTC — transcript t03).

Here is the honest wrinkle, because you
will trip over it if you script: **the
Node build refuses flow control.** Ask
its `bake` for Fork and it answers, in
full, `Sorry, the Fork operation is not
available in the Node.js version of
CyberChef` — and a recipe containing
**Magic** is refused on the same grounds
(Magic works when called directly, as
chapter 8 does). So the division of
labour is strict: recipes made only of
transforming operations travel anywhere;
recipes that steer live in the page.
`criteria.md` records this as a limit of
the lab's route, not a defect it found.

**Check:** take chapter 4's one-operation
recipe, save it as JSON from the page,
and read the file. If you can find the
operation's name and its alphabet
argument in the text, the model in this
chapter is yours — and so is every recipe
anyone hands you from now on.
