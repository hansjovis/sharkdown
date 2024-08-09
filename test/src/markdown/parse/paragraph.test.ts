import { it } from "node:test";
import { strictEqual } from "node:assert";

import tokenize from "../../../../src/markdown/tokenize/tokenize";
import parse from "../../../../src/markdown/parse/elements/paragraph";

it("can parse a simple paragraph", () => {
    const text = `This is a simple paragraph
    with some text.`;

    const tokens = tokenize(text);
    const paragraph = parse(tokens);

    strictEqual(paragraph.children.length, 2);
    strictEqual(paragraph.children[0], "This is a simple paragraph");
    strictEqual(paragraph.children[1], "with some text.");
});