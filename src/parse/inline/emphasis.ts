import Emphasis from "../../document/inline/Emphasis.js";
import EmphasisToken from "../../tokenize/inline/tokens/Emphasis.js";
import parseInline from "./parse.js";

export default function parse(tokens: any[]): Emphasis {
    let token = tokens.shift() as EmphasisToken;
    const emphasis = new Emphasis();
    let contents = "";

    while(tokens[0] && tokens[0].constructor !== EmphasisToken) {
        token = tokens.shift(); 
        contents += token.raw;
    }
    tokens.shift();

    emphasis.children = parseInline(contents);

    return emphasis;
}