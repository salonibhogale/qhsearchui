import * as React from 'react';
import { SearchkitComponent, FastClick, renderComponent } from '../../../../core';
const defaults = require('lodash/defaults');
const size = require('lodash/size');
const map = require('lodash/map');
export class FilterItem extends React.PureComponent {
    render() {
        const props = this.props;
        return (React.createElement("div", { className: props.bemBlocks
                .option()
                .mix(props.bemBlocks.container('item'))
                .mix(`selected-filter--${props.filterId}`) },
            React.createElement("div", { className: props.bemBlocks.option('name') },
                props.labelKey,
                ": ",
                props.labelValue),
            React.createElement(FastClick, { handler: props.removeFilter },
                React.createElement("div", { className: props.bemBlocks.option('remove-action') }, "x"))));
    }
}
export class SelectedFilters extends SearchkitComponent {
    constructor(props) {
        super(props);
        this.translate = this.translate.bind(this);
    }
    defineBEMBlocks() {
        const blockName = this.props.mod || 'sk-selected-filters';
        return {
            container: blockName,
            option: `${blockName}-option`
        };
    }
    getFilters() {
        return this.getQuery().getSelectedFilters();
    }
    hasFilters() {
        return size(this.getFilters()) > 0;
    }
    renderFilter(filter) {
        return renderComponent(this.props.itemComponent, {
            key: filter.name + '$$' + filter.value,
            bemBlocks: this.bemBlocks,
            filterId: filter.id,
            labelKey: this.translate(filter.name),
            labelValue: this.translate(filter.value),
            removeFilter: this.removeFilter.bind(this, filter),
            translate: this.translate
        });
    }
    removeFilter(filter) {
        filter.remove();
        this.searchkit.performSearch();
    }
    render() {
        if (!this.hasFilters()) {
            return null;
        }
        return (React.createElement("div", { className: this.bemBlocks.container() }, map(this.getFilters(), this.renderFilter.bind(this))));
    }
}
SelectedFilters.propTypes = defaults({}, SearchkitComponent.propTypes);
SelectedFilters.defaultProps = {
    itemComponent: FilterItem
};
//# sourceMappingURL=SelectedFilters.js.map