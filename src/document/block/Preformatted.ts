import Node from "../Node.js";

export default class Preformatted extends Node {
    constructor(
        public readonly language: string,
        children: any[] = [],
    ){
        super(children);
    }
}