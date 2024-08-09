import { Token } from "./Token.js";

export class Empty extends Token {
    constructor(
        rawContents: string,
        indentation: number
    ) {
        super(rawContents, indentation);
    }
    public static match(text: string): Empty {
        const match = text.match(/^(\s*)$/);
        if (!match) {
            return null;
        }
        return new Empty(
            match[0],
            match[1].length
        );
    }
}
