import Node from "../Node.js";

export default class Code extends Node{
    public readonly '@type': string = "InlineCode";
    constructor(
        public text: string
    ) { 
        super();
    }
}