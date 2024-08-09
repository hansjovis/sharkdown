
export default class Block {
    public readonly '@type': string = "Block";
    constructor(
        public readonly blockType: string,
        public readonly id: string = null,
        public readonly classes: string[] = [],
        public readonly attributes: Object = {},
        public children: any[] = [],
    ){}
}