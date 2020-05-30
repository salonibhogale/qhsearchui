import * as React from 'react';
import { RangeProps } from './RangeProps';
export declare class NumberInput extends React.Component<any, any> {
    constructor(props: any);
    static defaultProps: {
        value: string;
    };
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    isValid(value: any): boolean;
    onChange(e: any): void;
    render(): JSX.Element;
}
export interface RangeInputProps extends RangeProps {
    minPlaceholder?: string;
    maxPlaceholder?: string;
}
export declare class RangeInput extends React.Component<RangeInputProps, {}> {
    refs: {
        [key: string]: any;
        min: NumberInput;
        max: NumberInput;
    };
    static defaultProps: {
        mod: string;
        translate: () => any;
        minPlaceholder: string;
        maxPlaceholder: string;
    };
    constructor(props: any);
    handleSubmit(e: any): void;
    render(): JSX.Element;
}
