import Node from "../Node.js";

export default class UnorderedList extends Node {
    public readonly '@type': string = "UnorderedList";
    constructor(
        children: any[] = [],
    ){
        super(children);
    }
}