import Node from "../Node.js";
import Text from "./Text.js";

export default class Code extends Node{
    public readonly '@type': string = "InlineCode";
    constructor(
        text: string
    ) { 
        super([new Text(text)]);
    }
}