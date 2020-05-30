import { State } from '../state';
import { BoolMust, FilterBucket } from '../query';
import { FilterBasedAccessor } from './FilterBasedAccessor';
const assign = require('lodash/assign');
export class CheckboxFilterAccessor extends FilterBasedAccessor {
    constructor(key, options) {
        super(key, options.id);
        this.state = new State(false);
        this.options = options;
        this.filter = options.filter;
        this.state = this.state.create(options.defaultValue);
        this.translations = assign({}, options.translations);
    }
    getDocCount() {
        return this.getAggregations([this.uuid, 'doc_count'], 0);
    }
    buildSharedQuery(query) {
        if (this.state.getValue()) {
            query = query.addFilter(this.uuid, this.filter).addSelectedFilter({
                name: this.options.title || this.translate(this.key),
                value: this.options.label || this.translate('checkbox.on'),
                id: this.options.id,
                remove: () => (this.state = this.state.setValue(false))
            });
        }
        return query;
    }
    buildOwnQuery(query) {
        let filters = query.getFilters();
        if (!this.state.getValue()) {
            if (filters)
                filters = BoolMust([filters, this.filter]);
            else
                filters = this.filter;
        }
        return query.setAggs(FilterBucket(this.uuid, filters));
    }
}
CheckboxFilterAccessor.translations = {
    'checkbox.on': 'active'
};
//# sourceMappingURL=CheckboxFilterAccessor.js.map