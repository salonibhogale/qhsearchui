import * as PropTypes from 'prop-types';
export const RangePropTypes = {
    onChange: PropTypes.func.isRequired,
    onFinished: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    items: PropTypes.array,
    disabled: PropTypes.bool,
    mod: PropTypes.string,
    className: PropTypes.string,
    translate: PropTypes.func
};
//# sourceMappingURL=RangeProps.js.map