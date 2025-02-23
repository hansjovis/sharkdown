import Node from "../Node.js";

export default class Paragraph extends Node {
    constructor(
        children: Node[]
    ){
        super("p", children);
    }
}