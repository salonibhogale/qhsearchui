import { Accessor } from './Accessor';
export class AnonymousAccessor extends Accessor {
    constructor(buildSharedQuery) {
        super();
        if (buildSharedQuery) {
            this.buildSharedQuery = buildSharedQuery;
        }
    }
}
//# sourceMappingURL=AnonymousAccessor.js.map