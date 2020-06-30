import { Accessor } from './Accessor';
export class CustomHighlightAccessor extends Accessor {
    constructor(request) {
        super();
        this.request = request;
        this.highlightRequest = request;
    }
    buildOwnQuery(query) {
        return query.setHighlight(this.highlightRequest);
    }
}
//# sourceMappingURL=CustomHighlightAccessor.js.map