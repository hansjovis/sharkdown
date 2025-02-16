
export default class Node {
    public readonly '@type': string = "Block";
    constructor(
        public children: any[] = [],
    ){}

    public findAll(predicate: (node: any) => boolean): any[] {
        const result: any[] = [];
        for (const child of this.children) {
            if (predicate(child)) {
                result.push(child);
            }
            if (child.children) {
                result.push(...child.findAll(predicate));
            }
        }
        return result;
    }

    public findOne(predicate: (node: any) => boolean): any | null {
        for (const child of this.children) {
            if (predicate(child)) {
                return child;
            }
            if (child.children) {
                const result = child.findOne(predicate);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }
}