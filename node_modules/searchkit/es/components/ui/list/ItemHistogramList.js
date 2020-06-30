import * as React from 'react';
import { FastClick } from '../../../core/react/FastClick';
import { AbstractItemList } from './ItemListComponents';
const defaults = require('lodash/defaults');
export class ItemHistogramComponent extends React.PureComponent {
    getCountRatio() {
        const { rawCount, listDocCount } = this.props;
        if (rawCount == undefined || listDocCount == undefined || listDocCount == 0) {
            return 0;
        }
        return rawCount / listDocCount;
    }
    render() {
        const { bemBlocks, onClick, active, disabled, style, itemKey, label, count, showCount, showCheckbox } = this.props;
        const block = bemBlocks.option;
        const className = block()
            .state({ active, disabled, histogram: true })
            .mix(bemBlocks.container('item'));
        const barWidth = this.getCountRatio() * 100 + '%';
        return (React.createElement(FastClick, { handler: onClick },
            React.createElement("div", { className: className, style: style, "data-qa": "option", "data-key": itemKey },
                React.createElement("div", { className: block('bar-container') },
                    React.createElement("div", { className: block('bar'), style: { width: barWidth } })),
                showCheckbox ? (React.createElement("input", { type: "checkbox", "data-qa": "checkbox", checked: active, readOnly: true, className: block('checkbox').state({ active }) })) : (undefined),
                React.createElement("div", { "data-qa": "label", className: block('text') }, label),
                showCount && count != undefined ? (React.createElement("div", { "data-qa": "count", className: block('count') }, count)) : (undefined))));
    }
}
export class ItemHistogramList extends AbstractItemList {
}
ItemHistogramList.defaultProps = defaults({
    //mod: "sk-item-histogram",
    itemComponent: ItemHistogramComponent,
    showCount: true
}, AbstractItemList.defaultProps);
//# sourceMappingURL=ItemHistogramList.js.map