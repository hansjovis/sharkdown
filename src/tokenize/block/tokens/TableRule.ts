import { Token } from "./Token.js";

export class TableRule extends Token {
    constructor(
        rawContents: string,
        indentation: number
    ) {
        super(rawContents, indentation);
    }

    public static match(text: string): TableRule {
        const match = text.match(/^(\s*)\|(?: ?\-* ?\|)+/);
        if (!match) {
            return null;
        }
        return new TableRule(match[0], match[1].length);
    }
}