import { Token } from "./Token.js";

export class Block extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly type: string, 
        public readonly id: string|null,
        public readonly classes: string[] = [],
        public readonly attributes: any,
    ) {
        super(rawContents, indentation);
    }
    public static match(text: string): Block {
        const match = text.match(/^(\s*)<!-- {(\w+)(?:#([\w-]+))*((?:\.[\w-]+)*)((?:\[[\w-]+='.*'\])*)} -->/);
        if (!match) {
            return null;
        }
        const [ rawContents, indentation, type, id, classes, rawAttributes ] = match;
        const attributes = parseAttributes(rawAttributes);
        return new Block(
            rawContents,
            indentation.length,
            type,
            id,
            classes.split(".").filter(Boolean),
            attributes
        );
    }
}

function parseAttributes(rawAttributes: string) {
    const pairs = rawAttributes.split(/[\[\]]/).filter(Boolean);
    const splitPairs = pairs.map(pair => pair.split("="));

    const attributes = {};
    for(const [key, value] of splitPairs) {
        // Remove quotes from around the value.
        attributes[key] = value.slice(1, -1);
    }
    return attributes;
}
