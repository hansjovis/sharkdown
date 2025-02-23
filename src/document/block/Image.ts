import Node from "../Node.js";

export default class Image extends Node {
    constructor(
        public readonly source: string,
        public readonly description: string,
    ){
        super("img");
    }
}