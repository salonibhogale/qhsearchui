import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitComponent, FastClick, ResetSearchAccessor, renderComponent } from '../../../../../core';
const defaults = require('lodash/defaults');
export class ResetFiltersDisplay extends React.PureComponent {
    render() {
        const { bemBlock, hasFilters, resetFilters, clearAllLabel } = this.props;
        return (React.createElement("div", null,
            React.createElement(FastClick, { handler: resetFilters },
                React.createElement("div", { className: bemBlock().state({ disabled: !hasFilters }) },
                    React.createElement("div", { className: bemBlock('reset') }, clearAllLabel)))));
    }
}
export class ResetFilters extends SearchkitComponent {
    constructor(props) {
        super(props);
        this.translations = ResetFilters.translations;
        this.resetFilters = this.resetFilters.bind(this);
    }
    defineBEMBlocks() {
        return {
            container: this.props.mod || 'sk-reset-filters'
        };
    }
    defineAccessor() {
        return new ResetSearchAccessor(this.props.options);
    }
    resetFilters() {
        this.accessor.performReset();
        this.searchkit.performSearch();
    }
    render() {
        if (!this.accessor)
            return null;
        const props = {
            bemBlock: this.bemBlocks.container,
            resetFilters: this.resetFilters,
            hasFilters: this.accessor.canReset(),
            translate: this.translate,
            clearAllLabel: this.translate('reset.clear_all')
        };
        return renderComponent(this.props.component, props);
    }
}
ResetFilters.translations = {
    'reset.clear_all': 'Clear all filters'
};
ResetFilters.propTypes = defaults({
    translations: SearchkitComponent.translationsPropType(ResetFilters.translations),
    component: PropTypes.func,
    options: PropTypes.object
}, SearchkitComponent.propTypes);
ResetFilters.defaultProps = {
    component: ResetFiltersDisplay
};
//# sourceMappingURL=ResetFilters.js.map