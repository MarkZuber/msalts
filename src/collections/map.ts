export class Map<T> {
    private items: { [key: string]: T };

    constructor() {
        this.items = {};
    }

    public add(key: string, value: T): void {
        this.items[key] = value;
    }

    public has(key: string): boolean {
        return key in this.items;
    }

    public get(key: string): T {
        return this.items[key];
    }
}
