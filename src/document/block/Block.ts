import Node from "../Node.js";

export default class Block extends Node {
    public readonly '@type': string = "Block";
    constructor(
        type: string,
        public tag: string,
        public id: string = "",
        public classes: string[] = [],
        public attributes: Object = {},
        children: any[] = [],
    ){
        super(children);
        this['@type'] = type;
    }
}