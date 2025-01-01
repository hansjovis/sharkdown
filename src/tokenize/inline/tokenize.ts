import Code from "./tokens/Code.js";
import Anchor from "./tokens/Anchor.js";
import Emphasis from "./tokens/Emphasis.js";
import Strong from "./tokens/Strong.js";
import Text from "./tokens/Text.js";

const Tokens = [
    Strong, Emphasis, Anchor, Code,
];

// const tokenizeRegex = /(\*\*|_|\[.+\]\(.+\)|.+)/;
const tokenizeRegex = new RegExp(`(${Tokens.map(T => T.regex.source).join("|")})`);

export default function tokenize(text: string): any[] {
    const strings = text.split(tokenizeRegex).filter(Boolean);

    return strings.map(string => {
        for (const Token of Tokens) {
            const match = string.match(Token.regex);
            if (match) {
                return Token.fromMatch(match);
            }
        }
        return new Text(string);
    });
}