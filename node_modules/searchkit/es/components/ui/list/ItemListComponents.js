import * as React from 'react';
import { block } from '../../../core';
import { ItemComponent, CheckboxItemComponent } from './ItemComponents';
const map = require('lodash/map');
const includes = require('lodash/includes');
const defaults = require('lodash/defaults');
const identity = require('lodash/identity');
export class AbstractItemList extends React.PureComponent {
    isActive(option) {
        const { selectedItems, multiselect } = this.props;
        if (multiselect) {
            return includes(selectedItems, option.key);
        }
        if (selectedItems.length == 0)
            return null;
        return selectedItems[0] == option.key;
    }
    render() {
        const { mod, itemComponent, items = [], translate, toggleItem, setItems, multiselect, countFormatter, disabled, showCount, className, docCount } = this.props;
        const bemBlocks = {
            container: block(mod).el,
            option: block(`${mod}-option`).el
        };
        const toggleFunc = multiselect ? toggleItem : (key) => setItems([key]);
        const actions = map(items, (option) => {
            const label = option.title || option.label || option.key;
            return React.createElement(itemComponent, {
                label: translate(label),
                onClick: () => toggleFunc(option.key),
                bemBlocks: bemBlocks,
                key: option.key,
                itemKey: option.key,
                count: countFormatter(option.doc_count),
                rawCount: option.doc_count,
                listDocCount: docCount,
                disabled: option.disabled,
                showCount,
                active: this.isActive(option)
            });
        });
        return (React.createElement("div", { "data-qa": "options", className: bemBlocks
                .container()
                .mix(className)
                .state({ disabled }) }, actions));
    }
}
AbstractItemList.defaultProps = {
    mod: 'sk-item-list',
    showCount: true,
    itemComponent: CheckboxItemComponent,
    translate: identity,
    multiselect: true,
    selectItems: [],
    countFormatter: identity
};
export class ItemList extends AbstractItemList {
}
ItemList.defaultProps = defaults({
    itemComponent: ItemComponent
}, AbstractItemList.defaultProps);
export class CheckboxItemList extends AbstractItemList {
}
CheckboxItemList.defaultProps = defaults({
    itemComponent: CheckboxItemComponent
}, AbstractItemList.defaultProps);
export class Toggle extends AbstractItemList {
}
Toggle.defaultProps = defaults({
    itemComponent: ItemComponent,
    mod: 'sk-toggle',
    showCount: false
}, AbstractItemList.defaultProps);
export class Tabs extends AbstractItemList {
}
Tabs.defaultProps = defaults({
    itemComponent: ItemComponent,
    mod: 'sk-tabs',
    showCount: false,
    multiselect: false
}, AbstractItemList.defaultProps);
//# sourceMappingURL=ItemListComponents.js.map