import Node from "../Node.js";

export default class Anchor extends Node {
    constructor(
        public href: string = "",
        children: any[] = [],
    ) { 
        super("a", children);
    }
}