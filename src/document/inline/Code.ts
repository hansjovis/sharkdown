import Node from "../Node.js";
import Text from "./Text.js";

export default class Code extends Node{
    constructor(
        text: string
    ) { 
        super("code", [new Text(text)]);
    }
}