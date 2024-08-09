import { Token } from "../../tokenize/block/tokens/Token.js";
import UnorderedList from "../../document/block/UnorderedList.js";
import parseUnorderedListItem from "./unorderedListItem.js";

export default function parse(tokens: Token[]): UnorderedList {
    const list = new UnorderedList();

    while(tokens[0] && tokens[0].constructor.name === "UnorderedListItem") {
        const item = parseUnorderedListItem(tokens);
        list.children.push(item);
    }

    return list;
}