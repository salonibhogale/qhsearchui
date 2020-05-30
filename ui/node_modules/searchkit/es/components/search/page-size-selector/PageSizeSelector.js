import * as PropTypes from 'prop-types';
import { SearchkitComponent, PageSizeAccessor, RenderComponentPropType, renderComponent } from '../../../core';
import { Select } from '../../ui';
const map = require('lodash/map');
const defaults = require('lodash/defaults');
export class PageSizeSelector extends SearchkitComponent {
    getPageSizeAccessor() {
        return this.searchkit.getAccessorByType(PageSizeAccessor);
    }
    setSize(size) {
        const pageSizeAccessor = this.getPageSizeAccessor();
        if (size) {
            pageSizeAccessor.setSize(Number(size));
            this.searchkit.performSearch();
        }
    }
    setItems(sizes) {
        this.setSize(sizes[0]);
    }
    render() {
        const pageSizeAccessor = this.getPageSizeAccessor();
        if (pageSizeAccessor) {
            const options = map(this.props.options, (option) => ({ key: option, label: option }));
            const selectedSize = pageSizeAccessor.getSize();
            const { mod, className } = this.props;
            return renderComponent(this.props.listComponent, {
                mod,
                className,
                disabled: !this.hasHits(),
                items: options,
                selectedItems: [selectedSize],
                toggleItem: this.setSize.bind(this),
                setItems: this.setItems.bind(this),
                urlBuilder: () => { },
                translate: this.translate
            });
        }
        return null;
    }
}
PageSizeSelector.defaultProps = {
    listComponent: Select
};
PageSizeSelector.propTypes = defaults({
    listComponent: RenderComponentPropType,
    options: PropTypes.arrayOf(PropTypes.number).isRequired
}, SearchkitComponent.propTypes);
//# sourceMappingURL=PageSizeSelector.js.map