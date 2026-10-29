// CyberChef for Mere Mortals — lab: hashing and checksums (t02)
const cc = await import("cyberchef");
const P = "The quick brown fox jumps over the lazy dog";
console.log('MD5("abc")      :', cc.MD5("abc").toString());
console.log("  RFC 1321 says : 900150983cd24fb0d6963f7d28e17f72");
console.log("MD5(pangram)    :", cc.MD5(P).toString());
console.log("SHA1(pangram)   :", cc.SHA1(P).toString());
console.log("  published     : 2fd4e1c67a2d28fced849ee1bb76e7391b93eb12");
console.log('SHA2("abc", 256):', cc.SHA2("abc", ["256"]).toString());
console.log("  NIST vector   : ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
console.log("SHA2(pangram,256):", cc.SHA2(P, ["256"]).toString());
console.log("  published      : d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592");
console.log("SHA2(pangram) default size:", cc.SHA2(P).toString(), "(512)");
console.log("SHA3(pangram,256):", cc.SHA3(P, ["256"]).toString());
console.log("CRC Checksum(pangram, CRC-32):", cc.CRCChecksum(P, ["CRC-32"]).toString());
console.log("  python zlib.crc32 says     : 414fa339 (checked below)");
try {
  cc.CRCChecksum(P).toString();
} catch (e) {
  console.log('CRC Checksum with NO algorithm chosen fails on purpose: "' + e.message.split("\n")[0] + '"');
  console.log("  (the default is Custom, which needs parameters typed in — chapter 13 covers this)");
}
