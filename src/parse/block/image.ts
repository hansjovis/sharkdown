import { Token } from "../../tokenize/block/tokens/Token.js";
import { Image as ImageToken } from "../../tokenize/block/tokens/Image.js";
import Image from "../../document/block/Image.js";

export default function parse(tokens: Token[]): Image {
    const token = tokens.shift() as ImageToken;
    return new Image(token.source, token.description);
}