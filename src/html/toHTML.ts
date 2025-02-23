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

export default function toHTML(document: Document): string {
    if (!document) {
        return "";
    }
    return `<div class="document">${listToHTML(document.children)}</div>`;
}

function listToHTML(nodes: any[]): string {
    let str = "";
    for(const node of nodes) {
        switch(node['@type']) {
            case "Block":           str += block(node); break;
            case "Heading":          str += h(node); break;
            case "Code":            str += pre(node); break;
            case "Quote":           str += blockquote(node); break;
            case "UnorderedList":   str += ul(node); break;
            case "OrderedList":     str += ol(node); break;
            case "Paragraph":       str += p(node); break;
            case "Image":           str += img(node); break;
            case "ListItem":        str += li(node); break;
            case "Table":           str += table(node); break;
            default:                str += ""; break;  
        }
    }
    return str;
}

function inlineListToHTML(nodes: any[]): string {
    let str = "";
    for(const node of nodes) {
        switch(node['@type']) {
            case "Strong":      str += strong(node); break;
            case "Emphasis":    str += em(node); break;
            case "Anchor":      str += anchor(node); break;
            case "InlineCode":  str += code(node); break;
            case "Text":        str += node.text; break;
        }
    }
    return str;
}

function attributesToHTML(attributes: Record<string,any>): string {
    if (Object.keys(attributes).length === 0) {
        return "";
    }
    return " " + Object.entries(attributes)
        .map(([key, value]) => `${key}='${value}'`)
        .join(" ");
}

function block(node: Block): string {
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
        
    return `<${node.tag}${id}${classes}${attributes}>${listToHTML(node.children)}</${node.tag}>`;
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

function h(node: Heading): string {
    return `<h${node.level}>${inlineListToHTML(node.children)}</h${node.level}>`
}

function pre(node: Preformatted): string {
    const children = node.children.map(child => child.text).join("\n");
    return `<pre class="${node.language}">${children}</pre>`;
}

function blockquote(node: Quote): string {
    return `<blockquote>${listToHTML(node.children)}</blockquote>`;
}

function ul(node: UnorderedList): string {
    return `<ul>${listToHTML(node.children)}</ul>`;
}

function ol(node: OrderedList) {
    return `<ol>${listToHTML(node.children)}</ol>`;
}

function p(node: Paragraph) {
    return `<p>${inlineListToHTML(node.children)}</p>`;
}

function li(node: ListItem) {
    return `<li>${listToHTML(node.children)}</li>`;
}

function img(node: Image) {
    return `<img src="${node.source}" alt="${node.description}">`;
}

function table(node: Table) {
    const headerRow = `<tr>${node.header.map(cell => `<th>${cell}</th>`).join("")}</tr>`;
    const bodyRows = node.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`);

    return `<table><thead>${headerRow}</thead><tbody>${bodyRows.join("")}</tbody></table>`;
}

