import Node from "../Node.js";

export default class Table extends Node {
    constructor(
        public readonly header: string[] = [],
        public rows: string[][] = [],
    ) {
        super([]);
    }
}