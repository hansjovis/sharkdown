import Node from "../Node.js";

export default class Strong extends Node {
    public readonly '@type': string = "Strong";
    constructor(
        children: any[] = [],
    ) { 
        super(children);
    }
}