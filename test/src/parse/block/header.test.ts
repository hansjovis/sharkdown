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
    strictEqual(header.children[0], "Header ");
    strictEqual(header.children[1]["@type"], "Emphasis");
    strictEqual(header.children[1].children.length, 1);
    strictEqual(header.children[1].children[0], "level");
    strictEqual(header.children[2], " 2");
});