import { it } from "node:test";
import { strictEqual } from "node:assert/strict";

import tokenize from "../../../../src/markdown/tokenize/tokenize";
import parse from "../../../../src/markdown/parse/elements/code";

it("can parse a simple code block", () => {
    const text = `\`\`\`javascript
    const x = 2 + 3;
    const y = x - 5;
    \`\`\`
    `;

    const tokens = tokenize(text);
    const codeBlock = parse(tokens);

    strictEqual(codeBlock.language, "javascript");
    strictEqual(codeBlock.children.length, 2);
    strictEqual(codeBlock.children[0], "    const x = 2 + 3;");
    strictEqual(codeBlock.children[1], "    const y = x - 5;");
});