const esbuild = require("esbuild");
const path = require("path");

const root = path.resolve(__dirname, "..");

esbuild.buildSync({
    entryPoints: [path.join(root, "src", "firebase-client.js")],
    outfile: path.join(root, "Frontend", "firebase-client.bundle.js"),
    bundle: true,
    platform: "browser",
    format: "iife",
    globalName: "AogFirebase",
    target: ["es2022"]
});
