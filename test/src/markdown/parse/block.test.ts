import { it } from "node:test";
import { strictEqual } from "node:assert/strict";

import tokenize from "../../../../src/tokenize/block/tokenize";
import parse from "../../../../src/parse/block/block";

it("can parse a simple code block", () => {
    const text = `<!-- {header#top.ultra-wide.very-awesome} -->
# This is a heading within a header
With a subtitle.
<!-- {div.hero-image} -->
![](./hero-image.png)
<!-- {/div} -->
<!-- {/header} -->
    `;

    const tokens = tokenize(text);
    const block = parse(tokens);

    console.log(block);
});