import { it } from "node:test";

import tokenize from "../../../../src/markdown/tokenize/tokenize";
import parse from "../../../../src/markdown/parse/elements/orderedList";
import { strictEqual } from "node:assert";

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