import { Token } from "./tokens/Token.js";
import { Empty } from "./tokens/Empty.js";
import { Text } from "./tokens/Text.js";
import { Code } from "./tokens/Code.js";
import { Image } from "./tokens/Image.js";
import { OrderedListItem } from "./tokens/OrderedListItem.js";
import { UnorderedListItem } from "./tokens/UnorderedListItem.js";
import { Quote } from "./tokens/Quote.js";
import { Header } from "./tokens/Header.js";
import { Block } from "./tokens/Block.js";
import { BlockEnd } from "./tokens/BlockEnd.js";
import { TableRow } from "./tokens/TableRow.js";
import { TableRule } from "./tokens/TableRule.js";

function splitLines(text: string): string[] {
    return text.split("\n").map(str => str.trimEnd());
}

const TokenTypes = [
    Block,
    BlockEnd,
    Header,
    Quote,
    UnorderedListItem,
    OrderedListItem,
    Image,
    Code,
    TableRule,
    TableRow,
    Empty,
    Text,
];

export default function tokenize(text: string): Token[] {
    const lines = splitLines(text);
    
    return lines.map(line => {
        for (const TokenType of TokenTypes) {
            const token = TokenType.match(line);
            if (token) {
                return token;
            }
        }
        return new Text(line, 0, line);
    });
}