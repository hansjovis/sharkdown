import TextToken from "../../tokenize/inline/tokens/Text.js";
import Text from "../../document/inline/Text.js";

export default function parse(tokens: any[]): Text {
    let token = tokens.shift() as TextToken;
    return new Text(
        token.raw,
    );
}
