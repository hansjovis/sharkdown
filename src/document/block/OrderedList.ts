import Node from "../Node.js";

export default class OrderedList extends Node {
    public readonly '@type': string = "OrderedList";
    constructor(
        children: any[] = []
    ){
        super(children);
    }
}