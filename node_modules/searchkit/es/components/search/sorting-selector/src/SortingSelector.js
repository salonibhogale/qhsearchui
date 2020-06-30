import * as PropTypes from 'prop-types';
import { SearchkitComponent, SortingAccessor, renderComponent, RenderComponentPropType } from '../../../../core';
import { Select } from '../../../ui';
const defaults = require('lodash/defaults');
export class SortingSelector extends SearchkitComponent {
    defineAccessor() {
        return new SortingAccessor('sort', { options: this.props.options });
    }
    toggleItem(key) {
        this.accessor.state = this.accessor.state.setValue(key);
        this.searchkit.performSearch();
    }
    setItems(keys) {
        this.toggleItem(keys[0]);
    }
    render() {
        if (!this.accessor)
            return null;
        const { listComponent } = this.props;
        const options = this.accessor.options.options;
        const selected = [this.accessor.getSelectedOption().key];
        const disabled = !this.hasHits();
        return renderComponent(listComponent, {
            mod: this.props.mod,
            className: this.props.className,
            items: options,
            selectedItems: selected,
            setItems: this.setItems.bind(this),
            toggleItem: this.toggleItem.bind(this),
            disabled: disabled,
            urlBuilder: (item) => this.accessor.urlWithState(item.key),
            translate: this.translate
        });
    }
}
SortingSelector.propTypes = defaults({
    listComponent: RenderComponentPropType,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        field: PropTypes.string,
        order: PropTypes.string,
        defaultOption: PropTypes.bool
    }))
}, SearchkitComponent.propTypes);
SortingSelector.defaultProps = {
    listComponent: Select
};
//# sourceMappingURL=SortingSelector.js.map