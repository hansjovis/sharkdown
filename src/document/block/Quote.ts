export default class Quote {
    public readonly '@type': string = "Quote";
    constructor(
        public children: any[] = [],
    ) {}
}