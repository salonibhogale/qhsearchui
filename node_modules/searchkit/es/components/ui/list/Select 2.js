import * as React from 'react';
import { block } from '../../../core';
const map = require('lodash/map');
const identity = require('lodash/identity');
export class Select extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        const { setItems } = this.props;
        const key = e.target.value;
        setItems([key]);
    }
    getSelectedValue() {
        const { selectedItems = [] } = this.props;
        if (selectedItems.length == 0)
            return null;
        return selectedItems[0];
    }
    render() {
        const { mod, className, items, disabled, showCount, translate, countFormatter } = this.props;
        const bemBlocks = {
            container: block(mod).el
        };
        return (React.createElement("div", { className: bemBlocks
                .container()
                .mix(className)
                .state({ disabled }) },
            React.createElement("select", { onChange: this.onChange, value: this.getSelectedValue() }, map(items, ({ key, label, title, disabled, doc_count }) => {
                let text = translate(label || title || key);
                if (showCount && doc_count !== undefined)
                    text += ` (${countFormatter(doc_count)})`;
                return (React.createElement("option", { key: key, value: key, disabled: disabled }, text));
            }))));
    }
}
Select.defaultProps = {
    mod: 'sk-select',
    showCount: true,
    translate: identity,
    countFormatter: identity
};
//# sourceMappingURL=Select.js.map