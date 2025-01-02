import { Token } from "../../tokenize/block/tokens/Token.js";
import UnorderedList from "../../document/block/UnorderedList.js";
import parseUnorderedListItem from "./unorderedListItem.js";
import { defaultParseConfiguration, ParseConfiguration } from "../../ParseConfiguration.js";

export default function parse(tokens: Token[], config: ParseConfiguration = defaultParseConfiguration): UnorderedList {
    const list = new UnorderedList();

    while(tokens[0] && tokens[0].constructor.name === "UnorderedListItem") {
        const item = parseUnorderedListItem(tokens, config);
        list.children.push(item);
    }

    return list;
}