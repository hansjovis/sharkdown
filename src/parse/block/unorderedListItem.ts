import { Token } from "../../tokenize/block/tokens/Token.js";
import { UnorderedListItem as UnorderedListItemToken } from "../../tokenize/block/tokens/UnorderedListItem.js";
import ListItem from "../../document/block/ListItem.js";
import parseSharkdown from "../../sharkdown.js";
import { ParseConfiguration } from "../../ParseConfiguration.js";

export default function parse(tokens: Token[], config: ParseConfiguration): ListItem {
    let token = tokens.shift() as UnorderedListItemToken;

    const item = new ListItem();
    const baseIndentation = token.indentation;
    let contents = token.contents;

    while(tokens[0] && tokens[0].indentation >= baseIndentation + 2) {
        token = tokens.shift() as UnorderedListItemToken;
        contents += `\n${token.rawContents}`;
    }
    
    const doc = parseSharkdown(contents, config);
    item.children = doc.children;

    return item;
}