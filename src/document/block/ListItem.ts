export default class ListItem {
    public readonly '@type': string = "ListItem";
    constructor(
        public children: any[] = [],
    ){}
}