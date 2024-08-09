import { it } from "node:test";
import { strictEqual } from "node:assert/strict";
import tokenize from "../../../../src/markdown/tokenize/tokenize";
import parse from "../../../../src/markdown/parse/elements/quote";

it("can parse a simple quote", () => {
    const text = `> Hello
> - World!
>   - Nested list.
`;

    const tokens = tokenize(text);
    const quote = parse(tokens);
    
    strictEqual(quote.children.length, 2);
    strictEqual(quote.children[0].type, "Paragraph");
    strictEqual(quote.children[1].type, "UnorderedList");
    // Nested list.
    strictEqual(quote.children[1].children[0].children[1].type, "UnorderedList");
});