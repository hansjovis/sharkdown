import { Token } from "./Token.js";

export class BlockEnd extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly type: string,
    ) {
        super(rawContents, indentation);
    }
    public static match(text: string): BlockEnd {
        const match = text.match(/^(\s*)<!-- {\/(\w+)} -->/);
        if (!match) {
            return null;
        }
        const [ rawContents, indentation, type, id, classes ] = match;
        return new BlockEnd(
            rawContents,
            indentation.length,
            type,
        );
    }
}
