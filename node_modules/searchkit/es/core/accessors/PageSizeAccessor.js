import { ValueState } from '../state';
import { StatefulAccessor } from './StatefulAccessor';
export class PageSizeAccessor extends StatefulAccessor {
    constructor(defaultSize) {
        super('size');
        this.defaultSize = defaultSize;
        this.state = new ValueState();
    }
    setSize(size) {
        if (this.defaultSize == size) {
            this.state = this.state.clear();
        }
        else {
            this.state = this.state.setValue(size);
        }
    }
    getSize() {
        return Number(this.state.getValue() || this.defaultSize);
    }
    buildSharedQuery(query) {
        return query.setSize(this.getSize());
    }
}
//# sourceMappingURL=PageSizeAccessor.js.map