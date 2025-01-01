export default class Anchor {
    public static readonly regex = /\[(.+)\]\((.+?)\)/;

    constructor(
        public readonly raw: string,
        public readonly url: string,
        public readonly text: string
    ) { }

    public static fromMatch(match: RegExpMatchArray): Anchor {
        return new Anchor(
            match[0],
            match[2],
            match[1],
        );
    }
}
