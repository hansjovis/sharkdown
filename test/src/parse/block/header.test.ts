import { it } from "node:test";
import { strictEqual } from "node:assert";

import tokenize from "../../../../src/tokenize/block/tokenize.js";
import parse from "../../../../src/parse/block/header.js";

it("can parse a simple header", () => {
    const text = `## Header _level_ 2`;

    const tokens = tokenize(text);
    const header = parse(tokens);

    strictEqual(header["@type"], "Header");
    strictEqual(header.level, 2);
    strictEqual(header.children.length, 3);

    // Check contents of header.
    const [text1, emphasis, text2] = header.children;

    strictEqual(text1["@type"], "Text");
    strictEqual(text1.text, "Header ");

    strictEqual(emphasis["@type"], "Emphasis");
    strictEqual(emphasis.children.length, 1);

    const [text3] = emphasis.children;
    strictEqual(text3["@type"], "Text");
    strictEqual(text3.text, "level");

    strictEqual(text2["@type"], "Text");
    strictEqual(text2.text, " 2");
});