
export default class Document {
    public readonly '@type': string = "Document";
    constructor(
        public children: any[] = [],
    ){}
}