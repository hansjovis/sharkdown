import Node from "../Node.js";

export default class Anchor extends Node {
    public readonly '@type': string = "Anchor";
    constructor(
        public href: string = "",
        children: any[] = [],
    ) { 
        super(children);
    }
}