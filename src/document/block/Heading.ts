import Node from "../Node.js";

export default class Heading extends Node {
    public readonly '@type': string = "Heading";
    constructor(
        public readonly level: number,
        children: any[] = []
    ){
        super(children);
    }
}