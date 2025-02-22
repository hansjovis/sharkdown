import Node from "../Node.js";

export default class Paragraph extends Node {
    public readonly '@type': string = "Paragraph";
    constructor(
        children: Node[]
    ){
        super(children);
    }
}