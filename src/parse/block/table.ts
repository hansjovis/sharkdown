import Table from "../../document/block/Table.js";
import { TableRow } from "../../tokenize/block/tokens/TableRow.js";
import { Token } from "../../tokenize/block/tokens/Token.js";


export default function parse(tokens: Token[]): Table
{
    let token = tokens.shift() as TableRow;
    const table = new Table(token.cells);

    if (tokens[0] && tokens[0].constructor.name === "TableRule") {
        const ruleToken = tokens.shift();
    }
    
    while (tokens[0] && tokens[0].constructor.name === "TableRow") {
        token = tokens.shift() as TableRow;
        table.rows.push(token.cells);
    }

    return table;
}