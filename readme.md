# Sharkdown
An extendable Markdown parser.

> [!NOTE]
> This is mostly meant as a hobby project. It is meant to be useful for me. Use it at your own risk.

## How to use

[Sharkdown syntax](/docs/sharkdown-syntax.md);

### Functions

#### `parse(text, blockParsers): Document`
Parses source code into a Sharkdown document.

##### Parameters
- `text: string` - The source code to parse.
- `blockParsers: BlockParser[] = []` - An array of Block parsers (optional).

### Example
```ts
#!/usr/bin/env node
import { readFile, writeFile } from "fs/promises";

import { parse, toHTML } from "@hansjovis/sharkdown";

async function generate(): void {
    const [ inFile, outFile ] = process.argv.slice(2);

    if (!inFile) {
        console.error("[ERROR] no source file defined");
        return;
    }

    const sourceCode = await readFile(inFile, "utf-8");
    
    const document = parse(sourceCode);
    const html = toHTML(document);

    await writeFile(outFile || "out.html", html);
}

generate();
```

## How to develop
1. Clone this repository using Git.
    ```
    git clone ...
    ```
2. Install dependencies using NPM.
    ```
    npm install
    ```
3. Compile the source code.
    ```
    npm run compile
    ```
4. Run tests.
    ```
    npm run test
    ```