import * as React from 'react';
import { SearchkitComponent, FastClick } from '../../../../core';
export class TagFilter extends SearchkitComponent {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    isActive() {
        const { field, value } = this.props;
        const accessor = this.searchkit.accessors.statefulAccessors[field];
        if (!accessor) {
            console.warn('Missing accessor for', field, 'in TagFilter, add TagFilterConfig if needed');
            return false;
        }
        return accessor.state.contains(value);
    }
    handleClick() {
        const { field, value } = this.props;
        const accessor = this.searchkit.accessors.statefulAccessors[field];
        if (!accessor) {
            console.error('Missing accessor for', field, 'in TagFilter, add TagFilterConfig if needed');
            return;
        }
        accessor.state = accessor.state.toggle(value);
        this.searchkit.performSearch();
    }
    render() {
        const { value, children } = this.props;
        let className = 'sk-tag-filter';
        if (this.isActive())
            className += ' is-active';
        if (children) {
            return (React.createElement(FastClick, { handler: this.handleClick },
                React.createElement("div", { key: value, className: className }, this.props.children)));
        }
        // No children, use the value instead
        return (React.createElement(FastClick, { handler: this.handleClick },
            React.createElement("div", { key: value, className: className }, value)));
    }
}
//# sourceMappingURL=TagFilter.js.map