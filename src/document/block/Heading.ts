import Node from "../Node.js";

export default class Heading extends Node {
    public readonly '@type': string = "Heading";
    constructor(
        public readonly level: Number,
        children: any[] = []
    ){
        super(children);
    }
}