import Node from "../Node.js";

export default class Text extends Node {
    public readonly '@type': string = "Text";

    constructor(
        public text: string,
    ){
        super();
    }
}