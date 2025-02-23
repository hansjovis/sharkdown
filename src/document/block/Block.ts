import Node from "../Node.js";

export default class Block extends Node {
    public readonly '@type': string = "Block";
    constructor(
        type: string,
        public tag: string,
        attributes: Object = {},
        children: any[] = [],
    ){
        super(tag, children, attributes);
        this['@type'] = type;
    }
}