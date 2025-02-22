import { it } from "node:test";
import { strictEqual } from "node:assert";

import parse from "../../../src/sharkdown.js";
import toHtml from "../../../src/html/toHtml.js";
import Block from "../../../src/document/block/Block.js";

it("can find nodes in a document by type", () => {
    const text = `# Heading 1
Some paragraph text.

## Heading 2
Some more _paragraph_ text.

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

it("can manipulate the document tree", () => {
    const text = `# Heading 1
Some paragraph text.

## Heading 2
Some more _paragraph_ text.

### Heading 3
Even more paragraph text.`;

    const document = parse(text);

    const title = document.findOne(
        node => node["@type"] === "Header" && node.level === 1
    );

    const header = new Block("header");
    header.appendChild(title);

    document.prependChild(header);

    const [ newHeader ] = document.children;
    const [ titleNode ] = newHeader.children;

    strictEqual(newHeader["@type"], "Block");
    strictEqual(newHeader.blockType, "header");
    strictEqual(titleNode["@type"], "Header");
    strictEqual(titleNode.level, 1);
});
