import { Token } from "../../tokenize/block/tokens/Token.js";
import { OrderedListItem as OrderedListItemToken } from "../../tokenize/block/tokens/OrderedListItem.js";
import ListItem from "../../document/block/ListItem.js";
import parseSharkdown from "../../sharkdown.js";

export default function parse(tokens: Token[]): ListItem {
    let token = tokens.shift() as OrderedListItemToken;

    const item = new ListItem();
    const baseIndentation = token.indentation;
    let contents = token.contents;

    while(tokens[0] && tokens[0].indentation >= baseIndentation + 2) {
        token = tokens.shift() as OrderedListItemToken;
        contents += `\n${token.rawContents}`;
    }
    
    const doc = parseSharkdown(contents);
    item.children = doc.children;

    return item;
}