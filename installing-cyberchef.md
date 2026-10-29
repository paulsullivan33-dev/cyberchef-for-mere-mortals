# Installing CyberChef

By the end of this chapter CyberChef will
be open in front of you by at least one
of three routes — the hosted page, your
own downloaded copy, or the scripting
package — and you will have run the check
that proves it is really CyberChef and
not a lookalike. Nothing here needs an
account, a licence key, or a payment;
CyberChef is free and open source.

## Route 1: the hosted page

The official copy lives at
**https://gchq.github.io/CyberChef/**.
Open it and you are done installing:
there is nothing to install. Remember
chapter 1's point — the page is a static
app, so once it has loaded, your data is
processed in your browser and is not sent
to the site. This lab fetched that page
and confirmed it serves the real thing:
its title is `CyberChef` (transcript t05
in the lab).

The hosted page is always the latest
release. That is its one drawback: the
tool can change under you between visits,
which matters if you are following a
recipe someone wrote against an older
version — or if you want the tool to work
with the network cable out.

## Route 2: your own copy of the release

Releases are published on the project's
GitHub page as a single zip,
`CyberChef_<hash>.zip` — 83 MB for
version 11.5.0, the release this guide's
lab verified. Download it, unzip it
anywhere, and you get a folder holding:

- `CyberChef_v11.5.0.html` — the page
  itself (the version number will differ
  as releases move);
- `index.html.gz` and `index.html.br` —
  the same page pre-compressed, for web
  servers that serve compressed files;
- `assets/` and `modules/` — the
  JavaScript and styles the page loads,
  including a 13.6 MB main script;
- `images/` and some licence text files.

Serve the **whole folder** — the page is
useless without its assets. Any static
web server does; for a first try, the
one built into Python is enough, run
inside the unzipped folder:

```
python3 -m http.server 8000
```

Then open
`http://localhost:8000/CyberChef_v11.5.0.html`.
This lab did exactly that (with a
different port): the page answered with
HTTP 200 and the title `CyberChef`, and
its main script loaded at full size
(transcript t00). Chapter 9 is about
keeping a copy permanently, including
updates and offline use.

Opening the HTML file directly from disk
also works in most browsers, and is the
quickest way to use CyberChef on a
machine with no network at all — copy
the folder over on a USB stick and open
the page.

## Route 3: the scripting package

CyberChef's operations also ship as a
Node.js package, for running recipes from
scripts and other programs:

```
npm install cyberchef
```

The package exposes every operation as a
function, plus a `bake` function that
runs a whole recipe given as JSON — the
same JSON the web app saves (chapter 5).
This guide's lab ran all of its checks
through this package: version **11.5.0**,
under Node 24.

One honest wrinkle, recorded in full in
transcript t05: in this lab's sandbox the
install needed coaxing — the package's
own install script failed, so the lab
installed with `--ignore-scripts`, added
one optional dependency the node build
imports (`terser`), and repaired some
extensionless imports in a sub-dependency
before Node would load it. Treat that as
a property of this sandbox, not a step in
the normal instructions; on an ordinary
machine the one command above is the
whole route. The wrinkle is written down
because chapter 13's troubleshooting
starts from the principle that install
failures are information, not shame.

## The check

Whichever route you took, prove you have
the tool:

1. Open CyberChef.
2. In the operations search box, type
   `from base64`. The **From Base64**
   operation appears.
3. Type the pangram's Base64 form (from
   chapter 1) into Input, add the
   operation, and bake.

If the fox sentence comes back, your
install — hosted, local, or scripted —
is the real tool, and chapter 4 can take
it from there.
