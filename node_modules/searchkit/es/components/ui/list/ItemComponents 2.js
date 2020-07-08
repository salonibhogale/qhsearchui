import * as React from 'react';
import { FastClick } from '../../../core/react/FastClick';
function itemRenderer(props) {
    const { bemBlocks, onClick, active, disabled, style, itemKey, label, count, showCount, showCheckbox } = props;
    const block = bemBlocks.option;
    const className = block()
        .state({ active, disabled })
        .mix(bemBlocks.container('item'));
    const hasCount = showCount && count != undefined && count != null;
    return (React.createElement(FastClick, { handler: onClick },
        React.createElement("div", { className: className, style: style, "data-qa": "option", "data-key": itemKey },
            showCheckbox ? (React.createElement("input", { type: "checkbox", "data-qa": "checkbox", checked: active, readOnly: true, className: block('checkbox').state({ active }) })) : (undefined),
            React.createElement("div", { "data-qa": "label", className: block('text') }, label),
            hasCount ? (React.createElement("div", { "data-qa": "count", className: block('count') }, count)) : (undefined))));
}
export class ItemComponent extends React.PureComponent {
    render() {
        return itemRenderer(this.props);
    }
}
ItemComponent.defaultProps = {
    showCount: true,
    showCheckbox: false
};
export class CheckboxItemComponent extends React.PureComponent {
    render() {
        return itemRenderer(this.props);
    }
}
CheckboxItemComponent.defaultProps = {
    showCount: true,
    showCheckbox: true
};
//# sourceMappingURL=ItemComponents.js.map