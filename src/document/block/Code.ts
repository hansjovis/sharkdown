import Node from "../Node.js";

export default class Code extends Node {
    public readonly '@type': string = "Code";
    constructor(
        public readonly language: string,
        children: any[] = [],
    ){
        super(children);
    }
}