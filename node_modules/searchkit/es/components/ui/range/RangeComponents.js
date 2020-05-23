import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RangePropTypes } from './RangeProps';
import { RangeHistogram, RangeSlider, RangeInput } from './';
export class RangeComponent extends React.PureComponent {
    render() {
        const props = this.props;
        const { showHistogram, showSlider, showInput } = props;
        return (React.createElement("div", null,
            showHistogram ? React.createElement(RangeHistogram, Object.assign({}, props)) : undefined,
            showSlider ? React.createElement(RangeSlider, Object.assign({}, props)) : undefined,
            showInput ? React.createElement(RangeInput, Object.assign({}, props)) : undefined));
    }
}
RangeComponent.propTypes = Object.assign({ showHistogram: PropTypes.bool, showSlider: PropTypes.bool, showInput: PropTypes.bool }, RangePropTypes);
export function RangeComponentBuilder(components) {
    return (props) => React.createElement(RangeComponent, Object.assign({}, props, components));
}
export const RangeSliderHistogram = RangeComponentBuilder({ showHistogram: true, showSlider: true });
export const RangeSliderHistogramInput = RangeComponentBuilder({
    showHistogram: true,
    showSlider: true,
    showInput: true
});
export const RangeSliderInput = RangeComponentBuilder({ showSlider: true, showInput: true });
export const RangeHistogramInput = RangeComponentBuilder({ showHistogram: true, showInput: true });
//# sourceMappingURL=RangeComponents.js.map