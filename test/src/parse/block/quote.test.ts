import { it } from "node:test";
import { strictEqual } from "node:assert/strict";

import tokenize from "../../../../src/tokenize/block/tokenize.js";
import parse from "../../../../src/parse/block/quote.js";
import { ParseConfiguration } from "../../../../src/ParseConfiguration.js";

it("can parse a simple quote", () => {
    const text = `> Hello
> - World!
>   - Nested list.
`;
    const config: ParseConfiguration = {
        blocks: {
            parsers: [],
        },
        elements: {
            allowed: [],
        },
        attributes: {
            allowed: [],
        },
    };

    const tokens = tokenize(text);
    const quote = parse(tokens, config);
    
    strictEqual(quote.children.length, 2);
    strictEqual(quote.children[0]["@type"], "Paragraph");
    strictEqual(quote.children[1]["@type"], "UnorderedList");
    // Nested list.
    strictEqual(quote.children[1].children[0].children[1]["@type"], "UnorderedList");
});