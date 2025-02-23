import Node from "../Node.js";

export default class Text extends Node {
    constructor(
        public text: string,
    ){
        super();
    }
}