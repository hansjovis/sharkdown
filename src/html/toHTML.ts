import Block from "../document/block/Block.js";
import Preformatted from "../document/block/Preformatted.js";
import Document from "../document/Document.js";
import Heading from "../document/block/Heading.js";
import Image from "../document/block/Image.js";
import ListItem from "../document/block/ListItem.js";
import OrderedList from "../document/block/OrderedList.js";
import Paragraph from "../document/block/Paragraph.js";
import Quote from "../document/block/Quote.js";
import Table from "../document/block/Table.js";
import UnorderedList from "../document/block/UnorderedList.js";

import Strong from "../document/inline/Strong.js";
import Emphasis from "../document/inline/Emphasis.js";
import Anchor from "../document/inline/Anchor.js";
import InlineCode from "../document/inline/Code.js";

export interface Options {
    /**
     * Whether to pretty print the HTML output.
     */
    prettyPrint: boolean;
};

const defaultOptions: Options = {
    prettyPrint: false
};

export default function toHTML(
    document: Document, 
    options: Options = defaultOptions
): string {
    if (!document) {
        return "";
    }

    const startTag = `<div class="document">`;
    const children = listToHTML(document.children, 1, options);
    const endTag = `</div>`;

    return renderElement(startTag, children, endTag, 0, options);
}

function listToHTML(nodes: any[], depth: number = 0, options: Options = defaultOptions): string {
    let str = "";
    for (const node of nodes) {
        switch (node['@type']) {
            case "Block":           str += block(node, depth, options); break;
            case "Heading":         str += h(node, depth, options); break;
            case "Preformatted":    str += pre(node, depth, options); break;
            case "Quote":           str += blockquote(node, depth, options); break;
            case "UnorderedList":   str += ul(node, depth, options); break;
            case "OrderedList":     str += ol(node, depth, options); break;
            case "Paragraph":       str += p(node, depth, options); break;
            case "Image":           str += img(node, depth, options); break;
            case "ListItem":        str += li(node, depth, options); break;
            case "Table":           str += table(node); break;
            default:                str += ""; break;
        }
    }
    return str;
}

function inlineListToHTML(nodes: any[]): string {
    let str = "";
    for (const node of nodes) {
        switch (node['@type']) {
            case "Strong": str += strong(node); break;
            case "Emphasis": str += em(node); break;
            case "Anchor": str += anchor(node); break;
            case "InlineCode": str += code(node); break;
            case "Text": str += node.text; break;
        }
    }
    return str;
}

function renderElement(
    startTag: string, 
    content: string, 
    endTag: string, 
    depth: number,
    options: Options
): string {
    if (options.prettyPrint) {
        const padding = "  ".repeat(depth);
        return `${padding}${startTag}\n${content}${padding}${endTag}\n`;
    }
    return `${startTag}${content}${endTag}`;
}

function renderElementInline(
    startTag: string, 
    content: string, 
    endTag: string, 
    depth: number,
    options: Options
): string {
    if (options.prettyPrint) {
        const padding = "  ".repeat(depth);
        return `${padding}${startTag}${content}${endTag}\n`;
    }
    return `${startTag}${content}${endTag}`;
}

function renderText(
    text: string, 
    depth: number, 
    options: Options
): string {
    if (options.prettyPrint) {
        const padding = "  ".repeat(depth);
        return `${padding}${text}\n`;
    }
    return text;
}

function attributesToHTML(attributes: Record<string, any>): string {
    if (Object.keys(attributes).length === 0) {
        return "";
    }
    return " " + Object.entries(attributes)
        .map(([key, value]) => `${key}='${value}'`)
        .join(" ");
}

function block(node: Block, depth: number = 0, options: Options = defaultOptions): string {
    if (node.tag.match(/^[A-Z]/)) {
        // Custom block
        return '';
    }

    const id = node.id
        ? ` id="${node.id}"`
        : "";

    const classes = node.classes.length > 0
        ? ` class="${node.classes.join(" ")}"`
        : "";

    const attributes = attributesToHTML(node.attributes);

    const startTag = `<${node.tag}${id}${classes}${attributes}>`;
    const children = listToHTML(node.children, depth + 1, options);
    const endTag = `</${node.tag}>`;

    return renderElement(startTag, children, endTag, depth, options);
}

function strong(node: Strong): string {
    return `<strong>${inlineListToHTML(node.children)}</strong>`;
}

function em(node: Emphasis): string {
    return `<em>${inlineListToHTML(node.children)}</em>`;
}

function anchor(node: Anchor): string {
    return `<a href="${node.href}">${inlineListToHTML(node.children)}</a>`;
}

function code(node: InlineCode): string {
    const children = node.children.map(child => child.text).join("");
    return `<code>${children}</code>`;
}

function h(node: Heading, depth: number = 0, options: Options = defaultOptions): string {
    const startTag = `<h${node.level}>`;
    const children = inlineListToHTML(node.children);
    const endTag = `</h${node.level}>`;

    return renderElementInline(startTag, children, endTag, depth, options);
}

function pre(node: Preformatted, depth: number = 0, options: Options = defaultOptions): string {
    const startTag = `<pre class="${node.language}">`;
    const children = node.children.map(child => child.text).join("\n");
    const endTag = `</pre>`;

    return renderElementInline(startTag, children, endTag, depth, options);
}

function blockquote(node: Quote, depth: number = 0, options: Options = defaultOptions): string {
    const startTag = `<blockquote>`;
    const children = listToHTML(node.children, depth + 1, options);
    const endTag = `</blockquote>`;

    return renderElement(startTag, children, endTag, depth, options);
}

function ul(node: UnorderedList, depth: number = 0, options: Options = defaultOptions): string {
    const startTag = `<ul>`;
    const children = listToHTML(node.children, depth + 1, options);
    const endTag = `</ul>`;

    return renderElement(startTag, children, endTag, depth, options);
}

function ol(node: OrderedList, depth: number = 0, options: Options = defaultOptions): string {
    const startTag = `<ol>`;
    const children = listToHTML(node.children, depth + 1, options);
    const endTag = `</ol>`;

    return renderElement(startTag, children, endTag, depth, options);
}

function p(node: Paragraph, depth: number = 0, options: Options = defaultOptions): string {
    const startTag = `<p>`;
    const children = renderText(inlineListToHTML(node.children), depth + 1, options);
    const endTag = `</p>`;

    return renderElement(startTag, children, endTag, depth, options);
}

function li(node: ListItem, depth: number = 0, options: Options = defaultOptions): string {
    const startTag = `<li>`;
    const children = listToHTML(node.children, depth + 1, options);
    const endTag = `</li>`;

    return renderElement(startTag, children, endTag, depth, options);
}

function img(node: Image, depth: number = 0, options: Options = defaultOptions): string {
    if (options.prettyPrint) {
        const padding = "  ".repeat(depth);
        return `${padding}<img src="${node.source}" alt="${node.description}">\n`;
    }
    return `<img src="${node.source}" alt="${node.description}">`;
}

function table(node: Table) {
    const headerRow = `<tr>${node.header.map(cell => `<th>${cell}</th>`).join("")}</tr>`;
    const bodyRows = node.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`);

    return `<table><thead>${headerRow}</thead><tbody>${bodyRows.join("")}</tbody></table>`;
}

