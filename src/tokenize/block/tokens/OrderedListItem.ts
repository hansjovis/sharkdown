import { Token } from "./Token.js";

export class OrderedListItem extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly contents: string
    ) {
        super(rawContents, indentation);
    }

    public static match(text: string): OrderedListItem {
        const match = text.match(/^(\s*)[0-9]+\. (.+)/);
        if (!match) {
            return null;
        }
        return new OrderedListItem(
            match[0],
            match[1].length,
            match[2]
        );
    }
}
