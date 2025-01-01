import tokenize from "../../tokenize/inline/tokenize.js";

import Strong from "../../tokenize/inline/tokens/Strong.js";
import Emphasis from "../../tokenize/inline/tokens/Emphasis.js";
import Text from "../../tokenize/inline/tokens/Text.js";
import Anchor from "../../tokenize/inline/tokens/Anchor.js";
import Code from "../../tokenize/inline/tokens/Code.js";

import parseStrong from "./strong.js";
import parseEmphasis from "./emphasis.js";
import parseAnchor from "./anchor.js";
import parseCode from "./code.js";

export default function parse(text: string): any[] {
    const tokens = tokenize(text);
    console.log(tokens);
    const elements = [];
    while(tokens[0]) {
        const name = tokens[0].constructor;
        let child;
        switch(name) {
            case Strong:    child = parseStrong(tokens); break;
            case Emphasis:  child = parseEmphasis(tokens); break;
            case Anchor:    child = parseAnchor(tokens); break;
            case Code:      child = parseCode(tokens); break;
            case Text:      child = tokens[0].raw; tokens.shift(); break;
            default:        child = null; tokens.shift(); break;
        }
        elements.push(child);
    }
    return elements;
}