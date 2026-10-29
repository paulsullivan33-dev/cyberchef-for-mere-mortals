// CyberChef for Mere Mortals — lab: recipes and the bake (t03)
const cc = await import("cyberchef");
const P = "The quick brown fox jumps over the lazy dog";
const show = (label, v) => console.log(label, String(v));

// 1. A two-step recipe through bake(): pangram -> Base64 -> Hex
show("bake [To Base64, To Hex, no delimiter]:",
  (await cc.bake(P, [{op: "To Base64", args: ["A-Za-z0-9+/=", true]}, {op: "To Hex", args: ["None", 0]}])).toString());

// 2. Wrap twice, unwrap twice with the reverse recipe
const wrapped = (await cc.bake(P, ["To Base64", {op: "To Hex", args: ["None", 0]}])).toString();
show("unwrapped by [From Hex, From Base64]:", (await cc.bake(wrapped, ["From Hex", "From Base64"])).toString());

// 3. A recipe is JSON: print it, parse it back, bake from the parsed copy
const recipe = [{op: "To Base64", args: ["A-Za-z0-9+/=", true]}, {op: "ROT13"}];
show("recipe as JSON:", JSON.stringify(recipe));
show("bake from the parsed-back JSON:", (await cc.bake(P, JSON.parse(JSON.stringify(recipe)))).toString());
show("same recipe, ops called directly:", cc.ROT13(cc.toBase64(P).toString()).toString());

// 4. Flow control: Fork exists in the web app; the node build says so plainly
try {
  await cc.bake("978346800\n1012651200", [{op: "Fork", args: ["\\n", "\\n", false]}, {op: "From UNIX Timestamp", args: ["Seconds (s)"]}]);
  console.log("Fork recipe: ran (unexpected)");
} catch (e) { console.log("Fork in the node build:", e.message.split("\n")[0]); }
show("From UNIX Timestamp on its own (978346800):", cc.fromUNIXTimestamp("978346800").toString());

// 5. Errors: strict mode makes From Base64 refuse garbage instead of skipping it
try {
  await cc.bake("!!! not base64 !!!", [{op: "From Base64", args: ["A-Za-z0-9+/=", false, true]}]);
  console.log("strict From Base64: no error (unexpected)");
} catch (e) { console.log("strict From Base64 on '!!! not base64 !!!' stops the bake:", e.message.split("\n")[0].replace(/^Error: /, "")); }
show("lenient From Base64 on the same input gives:", JSON.stringify(cc.fromBase64("!!! not base64 !!!").toString()));
