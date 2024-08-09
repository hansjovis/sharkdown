import { Token } from "../../tokenize/block/tokens/Token.js";
import { Block as BlockToken } from "../../tokenize/block/tokens/Block.js";
import { BlockEnd } from "../../tokenize/block/tokens/BlockEnd.js";

import Block from "../../document/block/Block.js";

import parseSharkdown from "../../sharkdown.js";
import BlockParser from "../../extend/BlockParser.js";

export default function parse(tokens: Token[], blockParsers: BlockParser[] = []): Block {
    let token = tokens.shift() as BlockToken;
    const block = new Block(
        token.type,
        token.id,
        token.classes,
        token.attributes,
    );
    
    let contents = "";
    while(tokens[0] && tokens[0].constructor.name !== "BlockEnd") {
        const token = tokens.shift() as BlockEnd;
        contents += `\n${token.rawContents}`;
        if(token.type && token.type === block.blockType) {
            break;
        }
    }

    const doc = parseSharkdown(contents);
    block.children = doc.children;

    if(block.blockType.match(/^[A-Z]/)) {
        // Custom block (starts with a capital letter).
        const parser = blockParsers.find(parser => parser.blockType === block.blockType);
        if(parser) {
            return parser.parse(block);
        }
    }

    return block;
}