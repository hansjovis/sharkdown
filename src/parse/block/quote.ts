import Quote from "../../document/block/Quote.js";
import { Token } from "../../tokenize/block/tokens/Token.js";
import { Quote as QuoteToken } from "../../tokenize/block/tokens/Quote.js";
import parseSharkdown from "../../sharkdown.js";

export default function parse(tokens: Token[]): Quote {
    let token = tokens.shift() as QuoteToken;
    const quote = new Quote();

    let contents = token.contents;
    while(tokens[0] && tokens[0].constructor.name === "Quote") {
        token = tokens.shift() as QuoteToken;
        contents += `\n${token.contents}`;
    }

    const doc = parseSharkdown(contents);
    quote.children = doc.children;

    return quote;
}