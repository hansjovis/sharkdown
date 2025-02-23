import Node from "../Node.js";

export default class Block extends Node {
    public readonly '@type': string = "Block";
    constructor(
        public tag: string,
        public readonly id: string = null,
        public readonly classes: string[] = [],
        attributes: Object = {},
        children: any[] = [],
    ){
        super(children, attributes);
        this['@type'] = tag.charAt(0).toUpperCase() + tag.slice(1);
    }
}