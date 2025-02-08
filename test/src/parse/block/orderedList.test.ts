import { it } from "node:test";
import { strictEqual } from "node:assert";

import tokenize from "../../../../src/tokenize/block/tokenize.js";
import parse from "../../../../src/parse/block/orderedList.js";

it("can parse a simple ordered list", () => {
    const text = `1. A simple
  list with
  stuff.
2. Second item.
`;

    const tokens = tokenize(text);
    const list = parse(tokens);

    strictEqual(list.children.length, 2);
});