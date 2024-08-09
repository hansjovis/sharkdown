import { Token } from "./Token.js";

export class TableRow extends Token {
    constructor(
        rawContents: string,
        indentation: number,
        public readonly cells: string[]
    ) {
        super(rawContents, indentation);
    }

    public static match(text: string): TableRow {
        const match = text.match(/^(\s*)\|(.*\|)+/);
        if (!match) {
            return null;
        }
        const cells = match[2].split("|")
            .filter(Boolean)
            .map(cell => cell.trim());

        return new TableRow(match[0], match[1].length, cells);
    }
}
