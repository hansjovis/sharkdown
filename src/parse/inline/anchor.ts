import Anchor from "../../document/inline/Anchor.js";
import AnchorToken from "../../tokenize/inline/tokens/Anchor.js";
import parseInline from "./parse.js";

export default function parse(tokens: any[]): Anchor {
    let token = tokens.shift() as AnchorToken;
    const anchor = new Anchor(token.url);
    tokens.shift(); // Link text.

    anchor.children = parseInline(token.text);
    tokens.shift(); // URL.

    return anchor;
}