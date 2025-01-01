import Code from "../../document/inline/Code.js";
import CodeToken from "../../tokenize/inline/tokens/Code.js";

export default function parse(tokens: any[]) {
    let token = tokens.shift() as CodeToken; // Opening backtick.
    let text = tokens.shift(); // Code text.
    let code = new Code(text.raw);
    tokens.shift(); // Closing backtick.

    return code;
}