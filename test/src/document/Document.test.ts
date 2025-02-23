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
        node => node["@type"] === "Heading"
    );

    strictEqual(headings.length, 3);
    headings.forEach(heading => strictEqual(heading["@type"], "Heading"));

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
        node => node["@type"] === "Heading" && node.level === 1
    );

    const header = new Block("header");
    header.appendChild(title);

    document.prependChild(header);

    const [ newHeading ] = document.children;
    const [ titleNode ] = newHeading.children;

    strictEqual(newHeading["@type"], "Block");
    strictEqual(newHeading.blockType, "header");
    strictEqual(titleNode["@type"], "Heading");
    strictEqual(titleNode.level, 1);
});
