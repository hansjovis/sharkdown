
export default class Table {
    public readonly '@type': string = "Table";
    constructor(
        public readonly header: string[] = [],
        public rows: string[][] = [],
    ) {}
}