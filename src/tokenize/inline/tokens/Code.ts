export default class Code {
    public static readonly regex = /`/;

    constructor(
        public readonly raw: string = "`"
    ) { }

    public static fromMatch(match: RegExpMatchArray): Code {
        return new Code();
    }
}
