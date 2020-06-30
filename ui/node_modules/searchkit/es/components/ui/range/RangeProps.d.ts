import * as PropTypes from 'prop-types';
export interface RangeProps {
    onChange: (range: {
        min: number;
        max: number;
    }) => void;
    onFinished: (range: {
        min: number;
        max: number;
    }) => void;
    min: number;
    max: number;
    minValue?: number;
    maxValue?: number;
    items: Array<any>;
    disabled?: boolean;
    mod?: string;
    className?: string;
    translate?: (s: string) => string;
    [x: string]: any;
    children?: any;
}
export declare const RangePropTypes: {
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
};
