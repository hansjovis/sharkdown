import Node from "../Node.js";

export default class Block extends Node {
    public readonly '@type': string = "Block";
    constructor(
        public readonly blockType: string,
        public readonly id: string = null,
        public readonly classes: string[] = [],
        public readonly attributes: Object = {},
        children: any[] = [],
    ){
        super(children);
    }
}