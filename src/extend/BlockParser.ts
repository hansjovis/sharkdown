import Block from "../document/block/Block.js";

export default interface BlockParser {
    blockType: string;
    parse(block: Block): Block
}