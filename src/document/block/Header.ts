import Node from "../Node.js";

export default class Header extends Node {
    public readonly '@type': string = "Header";
    constructor(
        public readonly contents: string,
        public readonly level: Number,
    ){
        super();
    }
}