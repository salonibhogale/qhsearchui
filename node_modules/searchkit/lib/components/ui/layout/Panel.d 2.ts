import * as React from 'react';
import * as PropTypes from 'prop-types';
export interface PanelProps extends React.Props<Panel> {
    key?: any;
    title?: string;
    mod?: string;
    disabled?: boolean;
    className?: string;
    collapsable?: boolean;
    defaultCollapsed?: boolean;
}
export declare class Panel extends React.PureComponent<PanelProps, {
    collapsed: boolean;
}> {
    static propTypes: {
        title: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        mod: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        collapsable: PropTypes.Requireable<boolean>;
        defaultCollapsed: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        disabled: boolean;
        collapsable: boolean;
        defaultCollapsed: boolean;
        mod: string;
    };
    constructor(props: any);
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    toggleCollapsed(): void;
    render(): JSX.Element;
}
