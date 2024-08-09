import { Token } from "../../tokenize/block/tokens/Token.js";
import { Code as CodeToken } from "../../tokenize/block/tokens/Code.js";
import Code from "../../document/block/Code.js";

export default function parse(tokens: Token[]): Code {
    let token = tokens.shift() as CodeToken;
    const code = new Code(
        token.language
    );
    while(tokens[0] && tokens[0].constructor.name !== "Code") {
        token = tokens.shift() as CodeToken; 
        code.children.push(token.rawContents);
    }
    // Consume end-of-code token.
    tokens.shift();
    return code;
}