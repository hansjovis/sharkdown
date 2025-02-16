import { it } from "node:test";
import { strictEqual } from "node:assert/strict";

import tokenize from "../../../../src/tokenize/block/tokenize.js";
import parse from "../../../../src/parse/block/code.js";

it("can parse a simple code block", () => {
    const text = `\`\`\`javascript
    const x = 2 + 3;
    const y = x - 5;
    \`\`\`
    `;

    const tokens = tokenize(text);
    const codeBlock = parse(tokens);

    const [text1, text2] = codeBlock.children;

    strictEqual(codeBlock.language, "javascript");
    strictEqual(codeBlock.children.length, 2);

    strictEqual(text1["@type"], "Text");
    strictEqual(text1.text, "    const x = 2 + 3;");

    strictEqual(text2["@type"], "Text");
    strictEqual(text2.text, "    const y = x - 5;");
});