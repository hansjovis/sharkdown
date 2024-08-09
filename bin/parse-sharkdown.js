#!/usr/bin/env node
import { readFile, writeFile } from "fs/promises";

import { parseSharkdown, toHTML } from "../index.js";

async function generate() {
    const [ inFile, outFile ] = process.argv.slice(2);

    if (!inFile) {
        console.error("[ERROR] inFile not defined");
        return;
    }

    const sourceCode = await readFile(inFile, "utf-8");
    
    const document = parseSharkdown(sourceCode);
    const html = toHTML(document);

    await writeFile(outFile || "out.html", html);
}

generate();