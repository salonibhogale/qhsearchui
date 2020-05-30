import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitComponent, NestedFacetAccessor, renderComponent, RenderComponentPropType } from '../../../../../core';
import { Panel, ItemComponent } from '../../../../ui';
const defaults = require('lodash/defaults');
const map = require('lodash/map');
const identity = require('lodash/identity');
export class HierarchicalRefinementFilter extends SearchkitComponent {
    defineBEMBlocks() {
        const blockClass = this.props.mod || 'sk-hierarchical-refinement';
        return {
            container: `${blockClass}-list`,
            option: `${blockClass}-option`
        };
    }
    defineAccessor() {
        const { field, id, title, size, orderKey, orderDirection, startLevel } = this.props;
        return new NestedFacetAccessor(id, {
            field,
            id,
            title,
            size,
            orderKey,
            orderDirection,
            startLevel
        });
    }
    addFilter(level, option) {
        this.accessor.state = this.accessor.state.toggleLevel(level, option.key);
        this.searchkit.performSearch();
    }
    renderOption(level, option) {
        const active = this.accessor.resultsState.contains(level, option.key);
        const { countFormatter, itemComponent } = this.props;
        return (React.createElement("div", { key: option.key },
            renderComponent(itemComponent, {
                active,
                bemBlocks: this.bemBlocks,
                label: this.translate(option.key),
                itemKey: option.key,
                count: countFormatter(option.doc_count),
                showCount: true,
                onClick: this.addFilter.bind(this, level, option)
            }),
            active && this.renderOptions(level + 1)));
    }
    renderOptions(level) {
        const block = this.bemBlocks.container;
        return (React.createElement("div", { className: block('hierarchical-options') }, map(this.accessor.getBuckets(level), this.renderOption.bind(this, level))));
    }
    render() {
        if (!this.accessor)
            return null;
        const block = this.bemBlocks.container;
        const { id, title, containerComponent } = this.props;
        return renderComponent(containerComponent, {
            title,
            className: id ? `filter--${id}` : undefined,
            disabled: this.accessor.getBuckets(0).length == 0
        }, React.createElement("div", { className: block('root') }, this.renderOptions(0)));
    }
}
HierarchicalRefinementFilter.defaultProps = {
    countFormatter: identity,
    containerComponent: Panel,
    itemComponent: ItemComponent
};
HierarchicalRefinementFilter.propTypes = defaults({
    field: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    orderKey: PropTypes.string,
    orderDirection: PropTypes.oneOf(['asc', 'desc']),
    startLevel: PropTypes.number,
    countFormatter: PropTypes.func,
    containerComponent: RenderComponentPropType,
    itemComponent: RenderComponentPropType
}, SearchkitComponent.propTypes);
//# sourceMappingURL=HierarchicalRefinementFilter.js.map