export default class Image {
    public readonly '@type': string = "Image";
    constructor(
        public readonly source: string,
        public readonly description: string,
    ){}
}