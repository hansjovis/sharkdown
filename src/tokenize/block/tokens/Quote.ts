import { Token } from "./Token.js";

export class Quote extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly contents: string
    ) {
        super(rawContents, indentation);
    }

    public static match(text: string): Quote {
        const match = text.match(/^(\s*)> (.+)/);
        if (!match) {
            return null;
        }
        return new Quote(match[0], match[1].length, match[2]);
    }
}
