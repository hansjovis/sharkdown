import Block from "../document/block/Block.js";
import Code from "../document/block/Code.js";
import Document from "../document/Document.js";
import Header from "../document/block/Header.js";
import Image from "../document/block/Image.js";
import ListItem from "../document/block/ListItem.js";
import OrderedList from "../document/block/OrderedList.js";
import Paragraph from "../document/block/Paragraph.js";
import Quote from "../document/block/Quote.js";
import Table from "../document/block/Table.js";
import UnorderedList from "../document/block/UnorderedList.js";

import Strong from "../document/inline/Strong.js";
import Emphasis from "../document/inline/Emphasis.js";

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
            case "Header":          str += h(node); break;
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
        if (typeof node === "string") {
            str += node;
            continue;
        }
        switch(node['@type']) {
            case "Strong":      str += strong(node); break;
            case "Emphasis":    str += em(node); break;
        }
    }
    return str;
}

function block(node: Block): string {
    if (node.blockType.match(/^[A-Z]/)) {
        // Unrecognized block.
        return '';
    }

    const id = node.id
        ? ` id="${node.id}"` 
        : "";
    
    const classes = node.classes.length > 0
        ? ` class="${node.classes.join(" ")}"` 
        : "";

    const attributes = Object.entries(node.attributes)
        .map(([key, value]) => `${key}='${value}'`)
        .join(" ");
        
    return `<${node.blockType}${id}${classes} ${attributes}>${listToHTML(node.children)}</${node.blockType}>`;
}

function strong(node: Strong): string {
    return `<strong>${inlineListToHTML(node.children)}</strong>`;
}

function em(node: Emphasis): string {
    return `<em>${inlineListToHTML(node.children)}</em>`;
}

function h(node: Header): string {
    return `<h${node.level}>${node.contents}</h${node.level}>`
}

function pre(node: Code): string {
    return `<pre class="${node.language}">${node.children.join("\n")}</pre>`;
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

