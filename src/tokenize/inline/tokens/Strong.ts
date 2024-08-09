export default class Strong {
    public static readonly regex = /\*\*/;

    constructor(
        public readonly raw: string = '**'
    ) { }

    public static fromMatch(match: RegExpMatchArray): Strong {
        return new Strong();
    }
}
