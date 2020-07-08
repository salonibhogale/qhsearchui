import * as React from 'react';
import { block } from '../../../core';
const identity = require('lodash/identity');
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
export class RangeSlider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFinished = this.onFinished.bind(this);
    }
    onChange([min, max]) {
        this.props.onChange({ min, max });
    }
    onFinished([min, max]) {
        this.props.onFinished({ min, max });
    }
    render() {
        const { mod, className, step, marks, rangeFormatter, min, max, minValue, maxValue } = this.props;
        const bemBlocks = {
            container: block(mod).el
        };
        return (React.createElement("div", { className: bemBlocks.container().mix(className) },
            React.createElement(Range, { min: min, max: max, marks: marks || {
                    [min]: rangeFormatter(min),
                    [max]: rangeFormatter(max)
                }, tipFormatter: rangeFormatter, range: true, step: step, value: [minValue, maxValue], onChange: this.onChange, onAfterChange: this.onFinished })));
    }
}
RangeSlider.defaultProps = {
    mod: 'sk-range-slider',
    rangeFormatter: identity
};
//# sourceMappingURL=RangeSlider.js.map