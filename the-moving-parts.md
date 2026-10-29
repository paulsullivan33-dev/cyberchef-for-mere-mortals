# The Moving Parts

By the end of this chapter you will be
able to name every part of CyberChef's
screen and every idea behind it, so that
when a recipe misbehaves you can say
*which* part is misbehaving. The check at
the end asks you to find each part on
the real page.

CyberChef has four working parts, laid
out left to right on its page, plus one
idea — the **dish** — that runs
underneath all of them.

## Operations: the toolbox

The left column is the operations list:
several hundred small tools grouped into
categories such as *Encoding*, *Hashing*,
*Encryption*, *Data format* and *Network*.
A search box at the top filters the list
as you type — typing `sha` leaves the
hash operations standing, which is the
practical way to find anything, because
nobody scrolls the whole list twice.

Each **operation** does one job and has
a short name: **To Base64**, **From Hex**,
**SHA2**, **Magic**. Most take
**arguments** — settings shown under the
operation once it is in a recipe. From
Base64, for instance, has an *alphabet*
argument, because Base64 comes in
dialects (chapter 6). An operation that
cannot make sense of its input says so:
it stops the bake and the error appears
in the output area, rather than quietly
producing rubbish.

## Recipes: the chain

The middle column is the **recipe**: the
list of operations your input will flow
through, in order, top to bottom. You
build it by dragging operations in from
the left (or clicking them), and each one
can be:

- **disabled** — greyed out and skipped
  during the bake, without deleting it;
- **breakpointed** — the bake pauses
  after it, so you can see the data's
  state at that exact step;
- **removed**, or dragged to a new place
  in the order.

Order is the whole game: the recipe is a
pipeline, and each operation receives
whatever the previous one produced.
Base64-then-hex is a different recipe
from hex-then-Base64, in the same way
that socks-then-shoes differs from
shoes-then-socks.

## Input and output

The right side holds two panes. **Input**
is where your data goes — typed, pasted,
or loaded from a file. **Output** shows
the result of the **bake**: the run of
the recipe over the input. On the live
page, baking is usually automatic
(**auto-bake**) as you type or edit the
recipe; there is a **Bake!** button when
you want it manual, and a **Step** button
for walking through breakpointed recipes
one operation at a time.

Both panes deal in more than text. Input
can be a file — an image, a downloaded
archive — and output can be a file you
save back out. The small toolbar icons
on each pane handle loading, saving,
and switching the display between text
and hexadecimal.

## The dish: what flows between operations

Underneath, CyberChef keeps the data
being worked on in a **dish**: a
container that holds the data *and its
type* — byte array, string, number,
JSON, HTML, a list of files, and a few
more. The type matters because each
operation declares what it accepts and
what it produces, and the dish converts
between types as honestly as it can when
a step needs a different one.

You will rarely think about the dish
directly. You will notice it exactly
once: the first time an operation
produces output that *looks* wrong in
an interesting way — a picture that
turns into a screen of symbols, say —
which is the dish showing you bytes as
text. Chapter 13's troubleshooting starts
from that moment.

## Flow control: recipes that branch

A handful of operations do not transform
data at all; they steer the recipe.
**Fork** runs the rest of the recipe
separately over chunks of the input
(split on a delimiter you choose) and
**Merge** gathers the streams back.
**Register** stores a piece of the data
matched by a regular expression into a
named variable that later operations can
use. **Jump**, **Label** and **Conditional
Jump** give the recipe loops and choices.
Chapter 5 explains them, and is honest
about a wrinkle: the scripting form of
CyberChef refuses flow-control operations
outright, so their worked examples live
in the web app — the app itself ships a
Fork example, one click from its front
page. They are named here so their
presence in the operations list is not a
mystery.

**Check:** open CyberChef and, without
baking anything, find: the operations
search box; the recipe column; the input
and output panes; the Bake button. Then
search the operations list for `magic`
and for `fork`. If you can lay a finger
on all six, the map in this chapter is
yours, and installing the tool (next
chapter) is the only thing between you
and a first recipe.
