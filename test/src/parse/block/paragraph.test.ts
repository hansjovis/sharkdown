import { it } from "node:test";
import { strictEqual } from "node:assert";

import tokenize from "../../../../src/tokenize/block/tokenize.js";
import parse from "../../../../src/parse/block/paragraph.js";

it("can parse a simple paragraph", () => {
    const text = `This is a simple paragraph
    with some text.`;

    const tokens = tokenize(text);
    const paragraph = parse(tokens);

    strictEqual(paragraph.children.length, 2);
    const [text1, text2] = paragraph.children;

    strictEqual(text1["@type"], "Text");
    strictEqual(text1.text, "This is a simple paragraph");

    strictEqual(text2["@type"], "Text");
    strictEqual(text2.text, "with some text.");
});