import { it } from "node:test";
import { strictEqual } from "node:assert/strict";

import tokenize from "../../../../src/tokenize/block/tokenize.js";
import parse from "../../../../src/parse/block/block.js";
import { ParseConfiguration } from "../../../../src/ParseConfiguration.js";

it("can parse a simple code block", () => {
    const text = `<!-- {header#top.ultra-wide.very-awesome} -->
# This is a heading within a header
With a subtitle.
<!-- {div.hero-image} -->
![](./hero-image.png)
<!-- {/div} -->
<!-- {/header} -->
    `;

    const config: ParseConfiguration = {
        blocks: {
            parsers: [],
        },
        elements: {
            allowed: ["header", "div"],
        },
        attributes: {
            allowed: ["id", "class"],
        },
    };

    const tokens = tokenize(text);
    const block = parse(tokens, config);

    strictEqual(block.tag, "header");
    strictEqual(block.id, "top");
    
    strictEqual(block.classes.length, 2);
    strictEqual(block.classes[0], "ultra-wide");
    strictEqual(block.classes[1], "very-awesome");
});