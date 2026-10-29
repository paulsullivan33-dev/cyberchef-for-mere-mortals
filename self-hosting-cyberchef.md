# Self-Hosting CyberChef

By the end of this chapter your own copy
of CyberChef will be served from a folder
you control, working with the network
unplugged, and you will know how to keep
it updated. Chapter 3 did the quick
version — unzip, serve, open. This
chapter is the keeping version.

## Why keep a copy at all

Three reasons, in the order people
usually meet them:

1. **Offline.** The tool works on a
   machine with no network — a bench
   machine, a recovery laptop, a room
   where the network is the problem.
2. **Pinned.** Your copy is the version
   you downloaded until you choose
   another. Recipes and teaching material
   that name arguments and defaults stay
   true.
3. **Yours.** No third-party site is
   involved at all, even a benevolent
   static one — the strongest form of
   chapter 1's privacy property.

## The serving shape

From chapter 3: unzip the release and
serve the **whole folder**. The page —
`CyberChef_v11.5.0.html` in the current
release — loads its code from `assets/`
and `modules/` beside it; serve only the
HTML file and you get a page that cannot
start (chapter 13 has the symptom). Any
static server works. Two shapes cover
most readers:

- **Just for you, on your machine:**
  `python3 -m http.server 8000` in the
  folder, and open the versioned page on
  `localhost`. The lab served the release
  this way and verified the page and its
  13.6 MB main script both answer
  correctly (transcript t00).
- **For a household or a lab bench:** the
  same folder behind any web server you
  already run — nginx, Apache, a NAS's
  web service. The `index.html.gz` and
  `index.html.br` files in the release
  are pre-compressed copies of the page
  for servers that offer them; the lab
  confirmed the gzip copy is the same
  page, same title (transcript t00).

If you want the short address (the
server's root rather than the versioned
filename), copy or rename the versioned
HTML to `index.html` in your copy — the
relative asset paths still resolve,
since everything sits in one folder.

## Updating

Updating is replacing: download the new
release zip, unzip it beside the old
folder, point the server at the new
folder, test, and delete the old one
when satisfied. There is no database,
no state, and no configuration to
migrate — recipes live in your files
and links (chapter 5), not in the app.
Keeping one old release folder around
costs about 80 megabytes of disk (the
11.5.0 folder, as unzipped by the lab)
and buys a retreat if a new version
changes a behaviour you rely on.

## The limits of a local copy

A local copy is as trustworthy as its
download: fetch releases from the
project's official GitHub releases page,
and treat a CyberChef zip from anywhere
else the way chapter 7 treats any file —
hash it and compare, if a digest is
published. And a local copy still runs
in a browser: it inherits the browser's
memory limits, which chapter 12 sizes
up. Neither caveat is a reason to stay
hosted; they are the keeping costs,
stated plainly so the keeping is a
choice rather than a habit.

**Check:** with your copy served, pull
the network cable (or turn Wi-Fi off)
and reload the page, then bake chapter
4's recipe. The fox sentence, produced
with no network at all, is the whole
point of the chapter demonstrated in
five seconds.
