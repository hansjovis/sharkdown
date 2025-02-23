import { Token } from "../../tokenize/block/tokens/Token.js";
import { Code as CodeToken } from "../../tokenize/block/tokens/Code.js";
import Preformatted from "../../document/block/Preformatted.js";
import Text from "../../document/inline/Text.js";

export default function parse(tokens: Token[]): Preformatted {
    let token = tokens.shift() as CodeToken;
    const code = new Preformatted(
        token.language
    );
    while(tokens[0] && tokens[0].constructor.name !== "Code") {
        token = tokens.shift() as CodeToken; 
        code.appendChild(new Text(token.rawContents));
    }
    // Consume end-of-code token.
    tokens.shift();
    return code;
}