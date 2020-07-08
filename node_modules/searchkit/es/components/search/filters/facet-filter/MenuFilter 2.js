import { ItemList } from '../../../ui';
import { FacetFilter } from './FacetFilter';
import { FacetFilterPropTypes } from './FacetFilterProps';
const defaults = require('lodash/defaults');
const concat = require('lodash/concat');
const isUndefined = require('lodash/isUndefined');
const allItem = {
    key: '$all',
    label: 'All'
};
export class MenuFilter extends FacetFilter {
    toggleFilter(option) {
        if (option === allItem.key || this.accessor.state.contains(option)) {
            this.accessor.state = this.accessor.state.clear();
        }
        else {
            this.accessor.state = this.accessor.state.setValue([option]);
        }
        this.searchkit.performSearch();
    }
    setFilters(options) {
        this.toggleFilter(options[0]);
    }
    getSelectedItems() {
        const selectedValue = this.accessor.state.getValue()[0];
        return [!isUndefined(selectedValue) ? selectedValue : allItem.key];
    }
    getItems() {
        const all = {
            key: allItem.key,
            label: allItem.label,
            doc_count: this.accessor.getDocCount()
        };
        return concat([all], super.getItems());
    }
}
MenuFilter.propTypes = defaults({}, FacetFilterPropTypes.propTypes);
MenuFilter.defaultProps = defaults({
    listComponent: ItemList,
    operator: 'OR'
}, FacetFilter.defaultProps);
//# sourceMappingURL=MenuFilter.js.map