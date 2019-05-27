export class List<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    public size(): number {
        return this.items.length;
    }

    public add(value: T): void {
        this.items.push(value);
    }

    public get(index: number): T {
        return this.items[index];
    }
}