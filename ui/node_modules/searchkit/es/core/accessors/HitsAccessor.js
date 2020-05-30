import { Accessor } from './Accessor';
export class HitsAccessor extends Accessor {
    constructor(options) {
        super();
        this.options = options;
    }
    setResults(results) {
        super.setResults(results);
        this.scrollIfNeeded();
    }
    scrollIfNeeded() {
        if (this.searchkit.hasHitsChanged()) {
            if (this.options.scrollTo) {
                document.querySelector(this.getScrollSelector()).scrollTop = 0;
            }
        }
    }
    getScrollSelector() {
        return this.options.scrollTo == true ? 'body' : this.options.scrollTo.toString();
    }
}
//# sourceMappingURL=HitsAccessor.js.map