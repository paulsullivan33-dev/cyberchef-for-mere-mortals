// CyberChef for Mere Mortals — lab: analysis operations (t04)
const cc = await import("cyberchef");
import { createHmac } from "node:crypto";
const P = "The quick brown fox jumps over the lazy dog";

// Build a sample JWT here in the lab, signed with a sample key,
// so every claim about it can be checked against its construction.
const b64u = (s) => Buffer.from(s).toString("base64url");
const header = b64u(JSON.stringify({alg: "HS256", typ: "JWT"}));
const payload = b64u(JSON.stringify({sub: "sample-reader", purpose: "guide-demo", exp: 1893456000}));
const key = "sample-secret-key";
const sig = createHmac("sha256", key).update(header + "." + payload).digest("base64url");
const jwt = header + "." + payload + "." + sig;
console.log("Sample JWT built in the lab (HS256, key 'sample-secret-key'):");
console.log(jwt);
console.log();
console.log("JWT Decode:");
console.log(cc.JWTDecode(jwt).toString());
console.log("JWT Verify with the right key returns the claims:");
console.log(cc.JWTVerify(jwt, [key]).toString());
try { cc.JWTVerify(jwt, ["wrong-key"]); console.log("JWT Verify with a wrong key: verified?! (unexpected)"); }
catch (e) { console.log("JWT Verify with a wrong key stops the bake:", e.message.split("\n")[0]); }
console.log();

// Magic: hand it wrapped data with no hints (Magic is asynchronous — it returns a Promise)
const b64 = cc.toBase64(P).toString();
console.log("Magic on the Base64 pangram — first suggested recipe:");
console.log(JSON.stringify(JSON.parse((await cc.magic(b64)).toString())[0].recipe));
const magicJwt = JSON.parse((await cc.magic(jwt)).toString());
console.log("Magic on the JWT — first suggested op:", JSON.stringify(magicJwt[0].recipe[0].op), "| candidate matches:", magicJwt.length);
const hexP = cc.toHex(P, ["None"]).toString();
console.log("Magic on the hex pangram — first suggested op:", JSON.stringify(JSON.parse((await cc.magic(hexP)).toString())[0].recipe[0].op));

// One level deeper: Magic at depth 2 on doubly-wrapped data.
// (Magic inside a bake() recipe is refused by the node API — it is classed as flow control;
//  called directly with a Depth argument it works, as here.)
const dbl = cc.toBase64(hexP).toString();
const deep = JSON.parse((await cc.magic(dbl, [2, false, false])).toString());
console.log("Magic (depth 2) on Base64-of-hex — first recipe chain:", deep[0].recipe.map(r => r.op).join(" -> "));
console.log();

// Frequency distribution: the node build returns the chart's data as JSON;
// the web app draws the same numbers as a bar chart.
const fd = JSON.parse(cc.frequencyDistribution(P).toString());
console.log("Frequency distribution of the pangram: dataLength =", fd.dataLength);
for (const ch of [" ", "e", "o", "t", "z"]) {
  console.log("  '" + ch + "' :", fd.percentages[ch.charCodeAt(0)].toFixed(2) + "%");
}
console.log("Entropy of the pangram (Shannon, bits per byte):", Number(cc.entropy(P).toString()).toFixed(4));
console.log("Entropy of its Base64 form:", Number(cc.entropy(b64).toString()).toFixed(4));
console.log("Entropy of its hex form:", Number(cc.entropy(hexP).toString()).toFixed(4));
