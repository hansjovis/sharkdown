export default class Anchor {
    public readonly '@type': string = "Anchor";
    constructor(
        public href: string = "",
        public children: any[] = [],
    ) { }
}