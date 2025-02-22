import { Token } from "../../tokenize/block/tokens/Token.js";
import { Text } from "../../tokenize/block/tokens/Text.js";
import parseInline from "../inline/parse.js";
import Paragraph from "../../document/block/Paragraph.js";

export default function parse(tokens: Token[]): Paragraph {
    let token = tokens.shift() as Text;
    const paragraph = new Paragraph(parseInline(token.contents));

    while(tokens[0] && tokens[0] instanceof Text) {
        token = tokens.shift() as Text; 
        paragraph.appendChildren(parseInline(token.contents));
    }

    return paragraph;
}