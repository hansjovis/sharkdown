import { it } from "node:test";
import { strictEqual } from "node:assert";

import tokenize from "../../../../src/tokenize/block/tokenize.js";
import parse from "../../../../src/parse/block/header.js";

it("can parse a simple header", () => {
    const text = `## Header level 2`;

    const tokens = tokenize(text);
    const header = parse(tokens);

    strictEqual(header.contents, "Header level 2");
    strictEqual(header.level, 2);
});