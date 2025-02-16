import Node from "../Node.js";

export default class ListItem extends Node {
    public readonly '@type': string = "ListItem";
    constructor(
        children: any[] = [],
    ){
        super(children);
    }
}