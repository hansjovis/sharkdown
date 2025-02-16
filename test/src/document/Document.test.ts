import { it } from "node:test";
import { strictEqual } from "node:assert";

import parse from "../../../src/sharkdown.js";

it("can find nodes in a document by type", () => {
    const text = `# Heading 1
Some paragraph text.

## Heading 2
Some more paragraph text.

### Heading 3
Even more paragraph text.`;

    const document = parse(text);

    const headings = document.findAll(
        node => node["@type"] === "Header"
    );

    strictEqual(headings.length, 3);
    headings.forEach(heading => strictEqual(heading["@type"], "Header"));

    const paragraphs = document.findAll(
        node => node["@type"] === "Paragraph"
    );

    strictEqual(paragraphs.length, 3);
    paragraphs.forEach(paragraph => strictEqual(paragraph["@type"], "Paragraph"));
});