import Strong from "../../document/inline/Strong.js";
import StrongToken from "../../tokenize/inline/tokens/Strong.js";
import parseInline from "../inline/parse.js";

export default function parse(tokens: any[]): Strong {
    let token = tokens.shift() as StrongToken;
    const strong = new Strong();
    let contents = "";

    while(tokens[0] && tokens[0].constructor !== StrongToken) {
        token = tokens.shift(); 
        contents += token.raw;
    }
    tokens.shift();

    strong.appendChildren(parseInline(contents));

    return strong;
}