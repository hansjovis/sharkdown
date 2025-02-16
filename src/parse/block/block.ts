import { Token } from "../../tokenize/block/tokens/Token.js";
import { Block as BlockToken } from "../../tokenize/block/tokens/Block.js";

import Block from "../../document/block/Block.js";

import { parseTokens } from "../../sharkdown.js";
import { ParseConfiguration } from "../../ParseConfiguration.js";

function isAttributeAllowed(allowedAttribute: string|RegExp, key: string) {
    if (typeof allowedAttribute === "string") {
        return key === allowedAttribute;
    }
    return key.match(allowedAttribute) !== null;
}

function isAllowed(allowedAttributes: (string|RegExp)[], key: string) {
    return allowedAttributes.some(allowedAttribute => isAttributeAllowed(allowedAttribute, key));
}

function filterAllowedAttributes(attributes: Record<string, string>, allowed: (string|RegExp)[]): Record<string, string> {
    let filtered: Record<string, string> = {};

    for(const key in attributes) {
        if(isAllowed(allowed, key)) {
            filtered[key] = attributes[key];
        }
    }

    return filtered;
}

export default function parse(tokens: Token[], config: ParseConfiguration): Block|null {
    let token = tokens.shift() as BlockToken;

    if (config.elements.allowed.includes(token.type) === false) {
        return null;
    }
    const attributes = filterAllowedAttributes(token.attributes, config.attributes.allowed);

    const block = new Block(
        token.type,
        token.id,
        token.classes,
        attributes,
    );
    
    block.children = parseTokens(tokens, config).children;
    block.children.forEach(child => child.setParent(block));

    if(block.blockType.match(/^[A-Z]/)) {
        // Custom block (starts with a capital letter).
        const parser = config.blocks.parsers.find(parser => parser.blockType === block.blockType);
        if(parser) {
            return parser.parse(block);
        }
    }

    tokens.shift(); // Remove the block end token.

    return block;
}