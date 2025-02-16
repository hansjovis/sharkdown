import Node from "../Node.js";

export default class Emphasis extends Node {
    public readonly '@type': string = "Emphasis";
    constructor(
        children: any[] = [],
    ) { 
        super(children);
    }
}