import { Token } from "../../tokenize/block/tokens/Token.js";
import OrderedList from "../../document/block/OrderedList.js";
import parseOrderedListItem from "./orderedListItem.js";
import { defaultParseConfiguration, ParseConfiguration } from "../../ParseConfiguration.js";

export default function parse(tokens: Token[], config: ParseConfiguration = defaultParseConfiguration): OrderedList {
    const list = new OrderedList();

    while(tokens[0] && tokens[0].constructor.name === "OrderedListItem") {
        const item = parseOrderedListItem(tokens, config);
        list.appendChild(item);
    }

    return list;
}