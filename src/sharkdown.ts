import { Token } from "./tokenize/block/tokens/Token.js";
import Node from "./document/Node.js";
import Document from "./document/Document.js";

import parseBlock from "./parse/block/block.js";
import parseCode from "./parse/block/code.js";
import parseHeader from "./parse/block/header.js";
import parseUnorderedList from "./parse/block/unorderedList.js";
import parseOrderedList from "./parse/block/orderedList.js";
import parseQuote from "./parse/block/quote.js";
import parseImage from "./parse/block/image.js";
import parseParagraph from "./parse/block/paragraph.js";
import parseTable from "./parse/block/table.js";

import tokenize from "./tokenize/block/tokenize.js";
import { defaultParseConfiguration, ParseConfiguration } from "./ParseConfiguration.js";

export function parseTokens(tokens: Token[], config: ParseConfiguration = defaultParseConfiguration): Document {
    const doc = new Document();
    while(tokens[0]) {
        const name = tokens[0].constructor.name;
        let child: Node;
        switch(name) {
            case "Block":               child = parseBlock(tokens, config); break;
            case "Header":              child = parseHeader(tokens); break;
            case "Code":                child = parseCode(tokens); break;
            case "UnorderedListItem":   child = parseUnorderedList(tokens, config); break;
            case "OrderedListItem":     child = parseOrderedList(tokens, config); break;
            case "Quote":               child = parseQuote(tokens, config); break;
            case "Image":               child = parseImage(tokens); break;
            case "TableRow":            child = parseTable(tokens); break;
            case "Text":                child = parseParagraph(tokens); break;
            case "BlockEnd":            tokens.shift(); return doc;
            default:                    child = null; tokens.shift(); break;
        }
        if (child) {
            doc.appendChild(child);
        }
    }
    return doc;
}

export default function parse(text: string, config: ParseConfiguration = defaultParseConfiguration): Document {
    const tokens = tokenize(text);
    return parseTokens(tokens, config);
}
