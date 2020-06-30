import { ObjectState } from '../state';
import { FilterBucket, HistogramBucket, RangeQuery, BoolMust, CardinalityMetric, FieldContextFactory } from '../query';
import { FilterBasedAccessor } from './FilterBasedAccessor';
const identity = require('lodash/identity');
const maxBy = require('lodash/maxBy');
const get = require('lodash/get');
const assign = require('lodash/assign');
export class RangeAccessor extends FilterBasedAccessor {
    constructor(key, options) {
        super(key, options.id);
        this.state = new ObjectState({});
        this.translations = RangeAccessor.translations;
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
            return query.addFilter(this.uuid, rangeFilter).addSelectedFilter(selectedFilter);
        }
        return query;
    }
    getBuckets() {
        return this.getAggregations([this.uuid, this.fieldContext.getAggregationPath(), this.key, 'buckets'], []);
    }
    isDisabled() {
        if (this.options.loadHistogram) {
            const maxValue = get(maxBy(this.getBuckets(), 'doc_count'), 'doc_count', 0);
            return maxValue === 0;
        }
        return (this.getAggregations([this.uuid, this.fieldContext.getAggregationPath(), this.key, 'value'], 0) === 0);
    }
    getInterval() {
        if (this.options.interval) {
            return this.options.interval;
        }
        return Math.ceil((this.options.max - this.options.min) / 20);
    }
    buildOwnQuery(query) {
        const otherFilters = query.getFiltersWithoutKeys(this.uuid);
        const filters = BoolMust([
            otherFilters,
            this.fieldContext.wrapFilter(RangeQuery(this.options.field, {
                gte: this.options.min,
                lte: this.options.max
            }))
        ]);
        let metric;
        if (this.options.loadHistogram) {
            metric = HistogramBucket(this.key, this.options.field, {
                interval: this.getInterval(),
                min_doc_count: 0,
                extended_bounds: {
                    min: this.options.min,
                    max: this.options.max
                }
            });
        }
        else {
            metric = CardinalityMetric(this.key, this.options.field);
        }
        return query.setAggs(FilterBucket(this.uuid, filters, ...this.fieldContext.wrapAggregations(metric)));
    }
}
RangeAccessor.translations = {
    'range.divider': ' - '
};
//# sourceMappingURL=RangeAccessor.js.map