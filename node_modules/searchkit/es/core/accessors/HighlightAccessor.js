import { Accessor } from './Accessor';
const mapValues = require('lodash/mapValues');
const zipObject = require('lodash/zipObject');
const constant = require('lodash/constant');
export class HighlightAccessor extends Accessor {
    constructor(fields) {
        super();
        this.fields = fields;
        this.highlightFields = this.computeHighlightedFields(fields);
    }
    computeHighlightedFields(fields) {
        return {
            fields: mapValues(zipObject(fields), constant({}))
        };
    }
    buildOwnQuery(query) {
        return query.setHighlight(this.highlightFields);
    }
}
//# sourceMappingURL=HighlightAccessor.js.map