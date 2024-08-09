export abstract class Token {
    constructor(
        public readonly rawContents: string,
        public readonly indentation: number,
    ) {}
}