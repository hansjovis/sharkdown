import { Token } from "../../tokenize/block/tokens/Token.js";
import { Heading as HeadingToken } from "../../tokenize/block/tokens/Heading.js";
import Heading from "../../document/block/Heading.js";
import parseInline from "../inline/parse.js";

export default function parse(tokens: Token[]): Heading {
    const token = tokens.shift() as HeadingToken;
    return new Heading(
        token.level,
        parseInline(token.contents)
    );
}