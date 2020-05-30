import * as React from 'react';
import { FastClick, block } from '../../../core/react';
const map = require('lodash/map');
export class FilterGroupItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.removeFilter = this.removeFilter.bind(this);
    }
    removeFilter() {
        const { removeFilter, filter } = this.props;
        if (removeFilter) {
            removeFilter(filter);
        }
    }
    render() {
        const { bemBlocks, label, itemKey } = this.props;
        return (React.createElement(FastClick, { handler: this.removeFilter },
            React.createElement("div", { className: bemBlocks.items('value'), "data-key": itemKey }, label)));
    }
}
export class FilterGroup extends React.Component {
    constructor(props) {
        super(props);
        this.removeFilters = this.removeFilters.bind(this);
    }
    removeFilters() {
        const { removeFilters, filters } = this.props;
        if (removeFilters) {
            removeFilters(filters);
        }
    }
    render() {
        const { mod, className, title, filters } = this.props;
        const bemBlocks = {
            container: block(mod).el,
            items: block(`${mod}-items`).el
        };
        return (React.createElement("div", { key: title, className: bemBlocks.container().mix(className) },
            React.createElement("div", { className: bemBlocks.items() },
                React.createElement("div", { className: bemBlocks.items('title') }, title),
                React.createElement("div", { className: bemBlocks.items('list') }, map(filters, (filter) => this.renderFilter(filter, bemBlocks)))),
            this.renderRemove(bemBlocks)));
    }
    renderFilter(filter, bemBlocks) {
        const { translate, removeFilter } = this.props;
        return (React.createElement(FilterGroupItem, { key: filter.value, itemKey: filter.value, bemBlocks: bemBlocks, filter: filter, label: translate(filter.value), removeFilter: removeFilter }));
    }
    renderRemove(bemBlocks) {
        if (!this.props.removeFilters)
            return null;
        return (React.createElement(FastClick, { handler: this.removeFilters },
            React.createElement("div", { className: bemBlocks.container('remove-action'), onClick: this.removeFilters }, "X")));
    }
}
FilterGroup.defaultProps = {
    mod: 'sk-filter-group',
    translate: (str) => str
};
//# sourceMappingURL=FilterGroup.js.map