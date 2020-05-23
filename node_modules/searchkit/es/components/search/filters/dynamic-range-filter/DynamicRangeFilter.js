import * as PropTypes from 'prop-types';
import { SearchkitComponent, RenderComponentPropType, renderComponent, DynamicRangeAccessor } from '../../../../core';
import { Panel, RangeSlider } from '../../../ui';
const defaults = require('lodash/defaults');
const get = require('lodash/get');
const identity = require('lodash/identity');
export class DynamicRangeFilter extends SearchkitComponent {
    constructor(props) {
        super(props);
        this.sliderUpdate = this.sliderUpdate.bind(this);
        this.sliderUpdateAndSearch = this.sliderUpdateAndSearch.bind(this);
    }
    defineAccessor() {
        const { id, title, field, fieldOptions, rangeFormatter, translations } = this.props;
        return new DynamicRangeAccessor(id, {
            id,
            title,
            field,
            fieldOptions,
            rangeFormatter,
            translations
        });
    }
    defineBEMBlocks() {
        const block = this.props.mod || 'sk-dynamic-range-filter';
        return {
            container: block,
            labels: block + '-value-labels'
        };
    }
    getMinMax() {
        return {
            min: this.accessor.getStat('min') || 0,
            max: this.accessor.getStat('max') || 0
        };
    }
    sliderUpdate(newValues) {
        const { min, max } = this.getMinMax();
        if (newValues.min == min && newValues.max == max) {
            this.accessor.state = this.accessor.state.clear();
        }
        else {
            this.accessor.state = this.accessor.state.setValue(newValues);
        }
        this.forceUpdate();
    }
    sliderUpdateAndSearch(newValues) {
        this.sliderUpdate(newValues);
        this.searchkit.performSearch();
    }
    render() {
        if (!this.accessor)
            return null;
        const { id, title, containerComponent } = this.props;
        return renderComponent(containerComponent, {
            title,
            className: id ? `filter--${id}` : undefined,
            disabled: this.accessor.isDisabled()
        }, this.renderRangeComponent(this.props.rangeComponent));
    }
    renderRangeComponent(component) {
        const { min, max } = this.getMinMax();
        const { rangeFormatter } = this.props;
        const state = this.accessor.state.getValue();
        return renderComponent(component, {
            min,
            max,
            minValue: Number(get(state, 'min', min)),
            maxValue: Number(get(state, 'max', max)),
            rangeFormatter,
            onChange: this.sliderUpdate,
            onFinished: this.sliderUpdateAndSearch
        });
    }
}
DynamicRangeFilter.propTypes = defaults({
    field: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    containerComponent: RenderComponentPropType,
    rangeComponent: RenderComponentPropType,
    rangeFormatter: PropTypes.func,
    fieldOptions: PropTypes.shape({
        type: PropTypes.oneOf(['embedded', 'nested', 'children']).isRequired,
        options: PropTypes.object
    })
}, SearchkitComponent.propTypes);
DynamicRangeFilter.defaultProps = {
    containerComponent: Panel,
    rangeComponent: RangeSlider,
    rangeFormatter: identity
};
//# sourceMappingURL=DynamicRangeFilter.js.map