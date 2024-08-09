
export default class Code {
    public readonly '@type': string = "Code";
    constructor(
        public readonly language: string,
        public children: any[] = [],
    ){}
}