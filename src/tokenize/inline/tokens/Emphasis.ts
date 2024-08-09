export default class Emphasis {
    public static readonly regex = /_/;

    constructor(
        public readonly raw: string = '_'
    ) { }

    public static fromMatch(match: RegExpMatchArray): Emphasis {
        return new Emphasis();
    }
}
