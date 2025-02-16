import Node from "./Node.js";

export default class Document extends Node {
    public readonly '@type': string = "Document";
    constructor(
        children: any[] = [],
    ){
        super(children);
    }
}