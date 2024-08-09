import { Token } from "../../tokenize/block/tokens/Token.js";
import OrderedList from "../../document/block/OrderedList.js";
import parseOrderedListItem from "./orderedListItem.js";

export default function parse(tokens: Token[]): OrderedList {
    const list = new OrderedList();

    while(tokens[0] && tokens[0].constructor.name === "OrderedListItem") {
        const item = parseOrderedListItem(tokens);
        list.children.push(item);
    }

    return list;
}