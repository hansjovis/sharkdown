
export default class Node {
    public readonly '@type': string = "Block";
    public parent: Node | null = null;

    constructor(
        public children: any[] = [],
        public attributes: Record<string, any> = {},
    ){
        this.children.forEach(child => {
            if (child instanceof Node) {
                child.setParent(this);
            }
        });
    }

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

    public findClosestAncestor(predicate: (node: any) => boolean): any | null {
        if (this.parent) {
            if (predicate(this.parent)) {
                return this.parent;
            }
            return this.parent.findClosestAncestor(predicate);
        }
        return null;
    }

    public appendChild(child: Node) {
        this.children.push(child);
        child.setParent(this);
    }

    public prependChild(child: Node) {
        this.children.unshift(child);
        child.setParent(this);
    }

    public removeChild(child: Node) {
        this.children = this.children.filter(c => c !== child);
    }

    public remove() {
        if (this.parent) {
            this.parent.children = this.parent.children.filter(child => child !== this);
        }
    }

    public get siblings(): Node[] {
        if (this.parent) {
            return this.parent.children.filter(child => child !== this);
        }
        return [];
    }

    public setAttribute(key: string, value: any) {
        this.attributes[key] = value;
    }

    public getAttribute(key: string): any {
        return this.attributes[key];
    }

    public removeAttribute(key: string) {
        delete this.attributes[key];
    }

    public setParent(parent: Node) {
        this.parent = parent;
    }
}