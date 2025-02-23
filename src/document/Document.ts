import Node from "./Node.js";

export default class Document extends Node {
    constructor(
        children: any[] = [],
    ){
        super("#document", children);
    }
}