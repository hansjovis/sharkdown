import Node from "../Node.js";

export default class ListItem extends Node {
    constructor(
        children: any[] = [],
    ){
        super("li", children);
    }
}