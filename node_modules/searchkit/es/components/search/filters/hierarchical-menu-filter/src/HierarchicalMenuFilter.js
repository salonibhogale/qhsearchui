import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitComponent, HierarchicalFacetAccessor, renderComponent, RenderComponentPropType } from '../../../../../core';
import { Panel, ItemComponent } from '../../../../ui';
const defaults = require('lodash/defaults');
const map = require('lodash/map');
const identity = require('lodash/identity');
export class HierarchicalMenuFilter extends SearchkitComponent {
    defineBEMBlocks() {
        const blockClass = this.props.mod || 'sk-hierarchical-menu';
        return {
            container: `${blockClass}-list`,
            option: `${blockClass}-option`
        };
    }
    defineAccessor() {
        const { id, title, fields, size, orderKey, orderDirection } = this.props;
        return new HierarchicalFacetAccessor(id, {
            id,
            title,
            fields,
            size,
            orderKey,
            orderDirection
        });
    }
    addFilter(option, level) {
        this.accessor.state = this.accessor.state.toggleLevel(level, option.key);
        this.searchkit.performSearch();
    }
    renderOption(level, option) {
        const { countFormatter, itemComponent } = this.props;
        const active = this.accessor.state.contains(level, option.key);
        return (React.createElement("div", { key: option.key },
            renderComponent(itemComponent, {
                active,
                itemKey: option.key,
                showCount: true,
                bemBlocks: this.bemBlocks,
                onClick: this.addFilter.bind(this, option, level),
                label: this.translate(option.key),
                count: countFormatter(option.doc_count)
            }),
            (() => {
                if (this.accessor.resultsState.contains(level, option.key)) {
                    return this.renderOptions(level + 1);
                }
            })()));
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
HierarchicalMenuFilter.defaultProps = {
    countFormatter: identity,
    size: 20,
    containerComponent: Panel,
    itemComponent: ItemComponent
};
HierarchicalMenuFilter.propTypes = defaults({
    id: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    orderKey: PropTypes.string,
    orderDirection: PropTypes.oneOf(['asc', 'desc']),
    countFormatter: PropTypes.func,
    containerComponent: RenderComponentPropType,
    itemComponent: RenderComponentPropType
}, SearchkitComponent.propTypes);
//# sourceMappingURL=HierarchicalMenuFilter.js.map