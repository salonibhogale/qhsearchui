import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitManager } from '../SearchkitManager';
export interface SearchkitProps {
    searchkit: SearchkitManager;
    children?: any;
}
export declare class SearchkitProvider extends React.Component<SearchkitProps, any> {
    static childContextTypes: {
        searchkit: PropTypes.Requireable<SearchkitManager>;
    };
    static propTypes: {
        searchkit: PropTypes.Validator<SearchkitManager>;
        children: PropTypes.Validator<React.ReactElement<any>>;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    getChildContext(): {
        searchkit: SearchkitManager;
    };
    render(): any;
}
