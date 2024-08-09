import { Token } from "./Token.js";


export class Text extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly contents: string
    ) {
        super(rawContents, indentation);
    }
    public static match(text: string): Text {
        const match = text.match(/^(\s*)(.*)/);
        if (!match) {
            return null;
        }
        return new Text(
            match[0],
            match[1].length,
            match[2]
        );
    }
}
