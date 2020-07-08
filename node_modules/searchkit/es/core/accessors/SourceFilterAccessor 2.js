import { Accessor } from './Accessor';
export class SourceFilterAccessor extends Accessor {
    constructor(source) {
        super();
        this.source = source;
    }
    buildSharedQuery(query) {
        return query.setSource(this.source);
    }
}
//# sourceMappingURL=SourceFilterAccessor.js.map