export default class Text {
    public static readonly regex = /.+/;

    constructor(
        public readonly raw: string
    ) { }

    public static fromMatch(match: RegExpMatchArray): Text {
        return new Text(match[0]);
    }
}
