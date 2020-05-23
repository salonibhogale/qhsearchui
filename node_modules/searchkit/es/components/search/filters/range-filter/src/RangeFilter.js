import * as PropTypes from 'prop-types';
import { SearchkitComponent, RangeAccessor, RenderComponentPropType, renderComponent } from '../../../../../core';
import { Panel, RangeSliderHistogram, RangeSlider } from '../../../../ui';
const defaults = require('lodash/defaults');
const get = require('lodash/get');
export class RangeFilter extends SearchkitComponent {
    constructor(props) {
        super(props);
        this.sliderUpdate = this.sliderUpdate.bind(this);
        this.sliderUpdateAndSearch = this.sliderUpdateAndSearch.bind(this);
    }
    defineAccessor() {
        const { id, title, min, max, field, fieldOptions, interval, showHistogram, rangeFormatter, translations } = this.props;
        return new RangeAccessor(id, {
            id,
            min,
            max,
            title,
            field,
            rangeFormatter,
            translations,
            interval,
            loadHistogram: showHistogram,
            fieldOptions
        });
    }
    defineBEMBlocks() {
        const block = this.props.mod || 'sk-range-filter';
        return {
            container: block,
            labels: block + '-value-labels'
        };
    }
    sliderUpdate(newValues) {
        if (newValues.min == this.props.min && newValues.max == this.props.max) {
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
    getRangeComponent() {
        const { rangeComponent, showHistogram } = this.props;
        if (!showHistogram && rangeComponent === RangeSliderHistogram) {
            return RangeSlider;
        }
        return rangeComponent;
    }
    render() {
        if (!this.accessor)
            return null;
        const { id, title, containerComponent } = this.props;
        return renderComponent(containerComponent, {
            title,
            className: id ? `filter--${id}` : undefined,
            disabled: this.accessor.isDisabled()
        }, this.renderRangeComponent(this.getRangeComponent()));
    }
    renderRangeComponent(component) {
        const { min, max, rangeFormatter, marks } = this.props;
        const state = this.accessor.state.getValue();
        return renderComponent(component, {
            min,
            max,
            minValue: Number(get(state, 'min', min)),
            maxValue: Number(get(state, 'max', max)),
            items: this.accessor.getBuckets(),
            onChange: this.sliderUpdate,
            onFinished: this.sliderUpdateAndSearch,
            rangeFormatter,
            marks
        });
    }
}
RangeFilter.propTypes = defaults({
    field: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    containerComponent: RenderComponentPropType,
    rangeComponent: RenderComponentPropType,
    fieldOptions: PropTypes.shape({
        type: PropTypes.oneOf(['embedded', 'nested', 'children']).isRequired,
        options: PropTypes.object
    }),
    rangeFormatter: PropTypes.func,
    marks: PropTypes.object
}, SearchkitComponent.propTypes);
RangeFilter.defaultProps = {
    containerComponent: Panel,
    rangeComponent: RangeSliderHistogram,
    showHistogram: true
};
//# sourceMappingURL=RangeFilter.js.map