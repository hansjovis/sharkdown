#!/usr/bin/env node
import { readFile, writeFile } from "fs/promises";

import { parse, toHTML } from "../index.js";

async function generate(inFile, outFile) {
    if (!inFile) {
        console.error("[ERROR] inFile not defined");
        return;
    }

    const sourceCode = await readFile(inFile, "utf-8");
    
    const document = parse(sourceCode);
    const html = toHTML(document);

    await writeFile(outFile || inFile.replace(/\.md$/, '.html'), html);
}

const [ inFile, outFile ] = process.argv.slice(2);
generate(inFile, outFile);