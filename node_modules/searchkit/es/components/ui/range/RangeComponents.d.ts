import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare class RangeComponent extends React.PureComponent<any, {}> {
    static propTypes: {
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        onFinished: PropTypes.Validator<(...args: any[]) => any>;
        min: PropTypes.Validator<number>;
        max: PropTypes.Validator<number>;
        minValue: PropTypes.Requireable<number>;
        maxValue: PropTypes.Requireable<number>;
        items: PropTypes.Requireable<any[]>;
        disabled: PropTypes.Requireable<boolean>;
        mod: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        translate: PropTypes.Requireable<(...args: any[]) => any>;
        showHistogram: PropTypes.Requireable<boolean>;
        showSlider: PropTypes.Requireable<boolean>;
        showInput: PropTypes.Requireable<boolean>;
    };
    render(): JSX.Element;
}
export declare function RangeComponentBuilder(components: any): (props: any) => JSX.Element;
export declare const RangeSliderHistogram: (props: any) => JSX.Element;
export declare const RangeSliderHistogramInput: (props: any) => JSX.Element;
export declare const RangeSliderInput: (props: any) => JSX.Element;
export declare const RangeHistogramInput: (props: any) => JSX.Element;
