import Block from "../document/block/Block.js";
import Node from "../document/Node.js";
import Heading from "../document/block/Heading.js";
import Text from "../document/inline/Text.js";
import Emphasis from "../document/inline/Emphasis.js";
import Strong from "../document/inline/Strong.js";
import Anchor from "../document/inline/Anchor.js";
import Code from "../document/inline/Code.js";
import Preformatted from "../document/block/Preformatted.js";
import Quote from "../document/block/Quote.js";
import Image from "../document/block/Image.js";
import Paragraph from "../document/block/Paragraph.js";
import OrderedList from "../document/block/OrderedList.js";
import UnorderedList from "../document/block/UnorderedList.js";
import ListItem from "../document/block/ListItem.js";

export default function toMarkdown(node: Node, depth: number = 0): string {
    let str = "";

    if (!node.children) {
        return str;
    }

    let prevNode: Node;
    for(const child of node.children) {
        if (prevNode && prevNode["@type"] === "Paragraph" && child["@type"] === "Paragraph") {
            // Add a newline between paragraphs
            str += "\n";
        }
        switch(child['@type']) {
            case "Block":           str += block(child); break;
            case "Heading":         str += h(child); break;
            case "Preformatted":    str += pre(child); break;
            case "Quote":           str += blockquote(child); break;
            case "UnorderedList":   str += ul(child, depth); break;
            case "OrderedList":     str += ol(child, depth); break;
            case "Paragraph":       str += p(child); break;
            case "Image":           str += img(child); break;
            case "ListItem":        str += li(child); break;
            case "Table":           str += table(child); break;
            default:                str += ""; break;
        }
        prevNode = child;
    }

    return str;
}

function inlineListToMarkdown(children: Node[]): string {
    return children.map(child => {
        switch(child['@type']) {
            case "Text":        return text(child as Text);
            case "Emphasis":    return em(child as Emphasis);
            case "Strong":      return strong(child as Strong);
            case "Link":        return a(child as Anchor);
            case "Code":        return code(child as Code);
            default: return "";
        }
    }).join("");
}

function text(node: Text): string {
    return node.text;
}

function em(node: Emphasis): string {
    return `_${inlineListToMarkdown(node.children)}_`;
}

function strong(node: Strong): string {
    return `**${inlineListToMarkdown(node.children)}**`;
}

function a(node: Anchor): string {
    return `[${inlineListToMarkdown(node.children)}](${node.href})`;
}

function code(node: Code): string {
    return `\`${node.children.join(" ")}\``;
}

function block(node: Block): string {
    const classString = node.classes.reduce((acc, cur) => acc + `.${cur}`, "");

    const startTag = `<!-- {${node.tag}#${node.id}${classString}} -->`;
    const contents = toMarkdown(node);
    const endTag = `<!-- {/${node.tag}} -->`;

    return `${startTag}\n${contents}\n${endTag}\n`;
}

function h(node: Heading): string {
    return `${"#".repeat(node.level)} ${inlineListToMarkdown(node.children)}\n`;
}

function pre(node: Preformatted): string {
    return "```\n" + inlineListToMarkdown(node.children) + "\n```\n";
}

function blockquote(node: Quote): string {
    return `> ${toMarkdown(node)}`;
}

function ul(node: UnorderedList, depth: number = 0): string {
    const padding = "  ".repeat(depth);
    const items = node.children.map(
        child => `${padding}- ${toMarkdown(child, depth + 1)}`
    );
    return items.join("");
}

function ol(node: OrderedList, depth: number = 0): string {
    const padding = "  ".repeat(depth);
    const items = node.children.map(
        (child, index) => `${padding}${index + 1}. ${toMarkdown(child, depth + 1)}`
    );
    return items.join("");
}

function p(node: Paragraph): string {
    return `${inlineListToMarkdown(node.children)}\n`;
}

function img(node: Image): string {
    return `![${node.description}](${node.source})\n`;
}

function li(node: ListItem): string {
    return `${inlineListToMarkdown(node.children)}\n`;
}

function table(node: Node): string {
    return "";
}