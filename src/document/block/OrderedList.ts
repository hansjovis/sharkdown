export default class OrderedList {
    public readonly '@type': string = "OrderedList";
    constructor(
        public children: any[] = []
    ){}
}