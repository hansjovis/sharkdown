import Node from "../Node.js";

export default class Table extends Node {
    public readonly '@type': string = "Table";
    constructor(
        public readonly header: string[] = [],
        public rows: string[][] = [],
    ) {
        super("table", []);
    }
}