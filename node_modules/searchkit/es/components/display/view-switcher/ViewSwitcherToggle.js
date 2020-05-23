import { SearchkitComponent, ViewOptionsAccessor, RenderComponentPropType, renderComponent } from '../../../core';
import { Toggle } from '../../ui';
const defaults = require('lodash/defaults');
export class ViewSwitcherToggle extends SearchkitComponent {
    getViewOptionsSwitcherAccessor() {
        return this.searchkit.getAccessorByType(ViewOptionsAccessor);
    }
    setView(view) {
        this.getViewOptionsSwitcherAccessor().setView(view);
    }
    render() {
        const viewOptionsAccessor = this.getViewOptionsSwitcherAccessor();
        if (viewOptionsAccessor) {
            const options = viewOptionsAccessor.options;
            const selectedOption = viewOptionsAccessor.getSelectedOption().key;
            return renderComponent(this.props.listComponent, {
                mod: this.props.mod,
                className: this.props.className,
                disabled: !this.hasHits(),
                items: options,
                selectedItems: [selectedOption],
                toggleItem: this.setView.bind(this),
                setItems: ([item]) => this.setView(item),
                translate: this.translate
            });
        }
        return null;
    }
}
ViewSwitcherToggle.defaultProps = {
    listComponent: Toggle
};
ViewSwitcherToggle.propTypes = defaults({
    listComponent: RenderComponentPropType
}, SearchkitComponent.propTypes);
//# sourceMappingURL=ViewSwitcherToggle.js.map