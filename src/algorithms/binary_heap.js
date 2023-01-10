export default class Heap {
    constructor(items, compare = null) {
        this.items = [];
        this.compare = compare || this.__defaultCompare;
    }

    push(item) {
        this.items.push(item);
        this.heapifyUp(this.size - 1);
    }

    pop() {
        if (this.size === 0)
            return null;

        this.__swap(0, this.size - 1);
        const min = this.items.pop();
        this.heapifyDown(0);
        return min;
    }

    peek() {
        return this.size > 0 ? this.items[0] : null;
    }

    clear() {
        this.items.splice(0, this.size);
    }

    get size() {
        return this.items.length;
    }

    heapifyDown(index) {
        const child_left_index = index * 2 + 1;
        const child_right_index = index * 2 + 2;

        if (child_left_index > this.size - 1)
            return;

        let min_index = child_left_index;
        if (
            child_right_index < this.size &&
            this.compare(this.items[child_left_index], this.items[child_right_index]) > 0) {
                min_index = child_right_index;
        }

        if (this.compare(this.items[index], this.items[min_index]) > 0) {
            this.__swap(index, min_index);
            this.heapifyDown(min_index);
        }
    }

    heapifyUp(index) {
        const parent_index = Math.floor((index - 1) / 2);
        if (
            parent_index >= 0 &&
            this.compare(this.items[parent_index], this.items[index]) > 0) {
                this.__swap(index, parent_index);
                this.heapifyUp(parent_index);
        }
    }

    __defaultCompare(x, y) {
        if (x === y)
            return 0;

        return x > y ? 1 : -1;
    }

    __swap(i, j) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}
