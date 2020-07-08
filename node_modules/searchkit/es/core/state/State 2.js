export class State {
    constructor(value = null) {
        this.value = value;
    }
    create(value) {
        return new this.constructor(value);
    }
    setValue(value) {
        return this.create(value);
    }
    clear() {
        return this.create(null);
    }
    getValue() {
        return this.value;
    }
    hasValue() {
        return !!this.value;
    }
}
//# sourceMappingURL=State.js.map