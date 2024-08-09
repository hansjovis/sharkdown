export default class Header {
    public readonly '@type': string = "Header";
    constructor(
        public readonly contents: string,
        public readonly level: Number,
    ){}
}