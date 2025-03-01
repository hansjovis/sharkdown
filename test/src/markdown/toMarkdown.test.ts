import { it } from "node:test";
import { strictEqual } from "node:assert/strict";

import parse from "../../../src/sharkdown.js";
import toMarkdown from "../../../src/markdown/toMarkdown.js";

it("can generate a markdown string from a document", () => {
    const text = `# Heading 1
Some _paragraph_ text.

Some other paragraph.
- List item 1
- List item 2
  - List item 2.1
  - List item 2.2
- List item 3
> A quote
\`\`\`
Some code
\`\`\`
![Alt text](./image.png)
`;

    const document = parse(text);

    const markdown = toMarkdown(document);

    strictEqual(markdown, text);
});