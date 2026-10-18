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
    alias: {
        "@firebase/app": path.join(root, "node_modules", "@firebase", "app")
    },
    footer: {
        js: "globalThis.AogFirebase = AogFirebase;"
    },
    target: ["es2022"]
});
