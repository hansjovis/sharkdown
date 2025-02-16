import Node from "../Node.js";

export default class Image extends Node {
    public readonly '@type': string = "Image";
    constructor(
        public readonly source: string,
        public readonly description: string,
    ){
        super();
    }
}