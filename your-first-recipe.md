# Your First Recipe

By the end of this chapter you will have
built a recipe, baked it, broken it on
purpose, and fixed it — the four things
every later chapter assumes you can do.
The recipe is the one from chapter 1:
turning Base64 back into a sentence.

## Build it

1. Open CyberChef (chapter 3).
2. In the **Input** pane, type or paste:

   ```
   VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZw==
   ```

3. In the operations search box, type
   `base64`. Two operations matter here:
   **To Base64** (writing) and **From
   Base64** (reading). Drag **From
   Base64** into the recipe column — or
   click it, which adds it too.
4. If **Auto Bake** is on (it is, by
   default), the output is already there.
   If not, press **Bake!**

The **Output** pane shows:

```
The quick brown fox jumps over the lazy dog
```

**Check:** that sentence, exactly, is the
success condition. This guide's lab ran
the same operation through CyberChef's
engine and cross-checked the answer with
the `base64` program (transcript t01);
the two agree, character for character.

## Run it backwards

A recipe is a pipeline, so the reverse
journey is a different recipe. Clear the
recipe (the bin icon above the column),
put the plain sentence in Input, and add
**To Base64**. The output is the wrapped
form you started from — the same string
the lab produced and the `base64` command
confirmed. Encoding and decoding are
separate operations because they are
separate jobs; CyberChef has no "undo"
operation because the reverse recipe *is*
the undo.

## Break it gently: disable and breakpoint

Two controls on each operation in a
recipe earn their keep immediately:

- The **disable** toggle greys the
  operation out. Bake again and the input
  passes through it untouched — with From
  Base64 disabled, the output is the
  Base64 text itself. Disabling is how
  you ask "is this step the one changing
  things?" without losing the step.
- The **breakpoint** toggle makes the
  bake pause right after that operation,
  showing the data at that point. With
  one operation there is nothing to pause
  between, but chapter 6's two-layer
  recipes are where this becomes the
  difference between guessing and seeing.

## When the bake complains

Change the input's last characters from
`Zw==` to `Zw` — chop the padding off.
Bake. CyberChef still decodes it: the
**From Base64** operation is *lenient* by
default, tidying small defects as it
goes. Now open the operation's arguments
(the recipe entry expands) and switch
**Strict mode** on, then bake again. The
bake stops and the output area carries
an error instead of a result.

That pair of behaviours — forgiving by
default, strict on request — runs through
the whole tool, and chapter 13 returns to
it: leniency is kind to hand-copied data
and dangerous to assumptions. The lab
pushed it further, feeding the decoder
outright junk: lenient mode skipped the
junk characters and decoded what was
left into nonsense bytes, while strict
mode refused with `Base64 input contains
non-alphabet char(s)` (transcript t03).
Nonsense that *looks* like output is the
tool's worst failure shape, and now you
have seen it in miniature.

**Check:** with strict mode on and the
padding restored, bake once more. The
sentence is back, and you have used every
control the rest of this guide needs:
search, add, bake, disable, breakpoint,
arguments, and the error pane.
