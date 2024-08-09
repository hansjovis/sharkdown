import { it } from "node:test";
import { strictEqual } from "node:assert";

import tokenize from "../../../../src/markdown/tokenize/tokenize";
import parse from "../../../../src/markdown/parse/elements/header";

it("can parse a simple header", () => {
    const text = `## Header level 2`;

    const tokens = tokenize(text);
    const header = parse(tokens);

    strictEqual(header.contents, "Header level 2");
    strictEqual(header.level, 2);
});