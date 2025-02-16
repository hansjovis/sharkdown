import { Token } from "../../tokenize/block/tokens/Token.js";
import { Header as HeaderToken } from "../../tokenize/block/tokens/Header.js";
import Header from "../../document/block/Header.js";
import parseInline from "../inline/parse.js";

export default function parse(tokens: Token[]): Header {
    const token = tokens.shift() as HeaderToken;
    return new Header(
        token.level,
        parseInline(token.contents)
    );
}