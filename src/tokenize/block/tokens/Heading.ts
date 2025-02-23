import { Token } from "./Token.js";


export class Heading extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly contents: string,
        public readonly level: Number
    ) {
        super(rawContents, indentation);
    }

    public static match(text: string): Heading {
        const match = text.match(/^(\s*)(#+) (.+)/);
        if (!match) {
            return null;
        }
        return new Heading(
            match[0],
            match[1].length,
            match[3],
            match[2].length
        );
    }
}
