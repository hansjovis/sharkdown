import Node from "../Node.js";

export default class Header extends Node {
    public readonly '@type': string = "Header";
    constructor(
        public readonly level: Number,
        children: any[] = []
    ){
        super(children);
    }
}