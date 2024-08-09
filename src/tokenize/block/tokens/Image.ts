import { Token } from "./Token.js";

export class Image extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly source: string,
        public readonly description: string
    ) {
        super(rawContents, indentation);
    }

    public static match(text: string): Image {
        const match = text.match(/^(\s*)!\[(.*)\]\((.*)\)/);
        if (!match) {
            return null;
        }
        return new Image(match[0], match[1].length, match[3], match[2]);
    }
}
