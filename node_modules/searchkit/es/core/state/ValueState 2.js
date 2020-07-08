import { State } from './State';
export class ValueState extends State {
    toggle(value) {
        if (this.is(value)) {
            return this.clear();
        }
        return this.setValue(value);
    }
    is(value) {
        return this.value === value;
    }
}
//# sourceMappingURL=ValueState.js.map