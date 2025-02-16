import Node from "../Node.js";

export default class Quote extends Node {
    public readonly '@type': string = "Quote";
    constructor(
        public children: any[] = [],
    ) {
        super(children);
    }
}