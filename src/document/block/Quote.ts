import Node from "../Node.js";

export default class Quote extends Node {
    constructor(
        public children: any[] = [],
    ) {
        super(children);
    }
}