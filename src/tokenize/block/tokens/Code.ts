import { Token } from "./Token.js";


export class Code extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly language: string
    ) {
        super(rawContents, indentation);
    }
    public static match(text: string): Code {
        const match = text.match(/^(\s*)```(\w*)/);
        if (!match) {
            return null;
        }
        return new Code(
            match[0],
            match[1].length,
            match[2]
        );
    }
}
