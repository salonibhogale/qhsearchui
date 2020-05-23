import { ObjectState } from '../state';
import { FilterBucket, RangeQuery, StatsMetric, FieldContextFactory } from '../query';
import { FilterBasedAccessor } from './FilterBasedAccessor';
const assign = require('lodash/assign');
const identity = require('lodash/identity');
export class DynamicRangeAccessor extends FilterBasedAccessor {
    constructor(key, options) {
        super(key, options.id);
        this.state = new ObjectState({});
        this.translations = DynamicRangeAccessor.translations;
        this.options = options;
        this.options.fieldOptions = this.options.fieldOptions || { type: 'embedded' };
        this.options.fieldOptions.field = this.options.field;
        this.fieldContext = FieldContextFactory(this.options.fieldOptions);
        this.options.rangeFormatter = this.options.rangeFormatter || identity;
        if (options.translations) {
            this.translations = assign({}, this.translations, options.translations);
        }
    }
    getSelectedValue(value) {
        const divider = this.translate('range.divider');
        return [
            this.options.rangeFormatter(value.min),
            divider,
            this.options.rangeFormatter(value.max)
        ].join('');
    }
    buildSharedQuery(query) {
        if (this.state.hasValue()) {
            const val = this.state.getValue();
            const rangeFilter = this.fieldContext.wrapFilter(RangeQuery(this.options.field, {
                gte: val.min,
                lte: val.max
            }));
            const selectedFilter = {
                name: this.translate(this.options.title),
                value: this.getSelectedValue(val),
                id: this.options.id,
                remove: () => {
                    this.state = this.state.clear();
                }
            };
            return query.addFilter(this.key, rangeFilter).addSelectedFilter(selectedFilter);
        }
        return query;
    }
    getStat(stat) {
        return this.getAggregations([this.key, this.fieldContext.getAggregationPath(), this.key, stat], 0);
    }
    isDisabled() {
        return this.getStat('count') === 0 || this.getStat('min') === this.getStat('max');
    }
    buildOwnQuery(query) {
        const otherFilters = query.getFiltersWithoutKeys(this.key);
        return query.setAggs(FilterBucket(this.key, otherFilters, ...this.fieldContext.wrapAggregations(StatsMetric(this.key, this.options.field))));
    }
}
DynamicRangeAccessor.translations = {
    'range.divider': ' - '
};
//# sourceMappingURL=DynamicRangeAccessor.js.map