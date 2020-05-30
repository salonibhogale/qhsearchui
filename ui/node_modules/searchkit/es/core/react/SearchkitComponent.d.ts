import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchkitManager } from '../SearchkitManager';
import { ImmutableQuery } from '../query';
import { Accessor } from '../accessors/Accessor';
export interface SearchkitComponentProps {
    mod?: string;
    className?: string;
    translations?: Record<string, any>;
    searchkit?: SearchkitManager;
    key?: string;
}
export declare class SearchkitComponent<P extends SearchkitComponentProps, S> extends React.Component<P, S> {
    _searchkit: SearchkitManager;
    accessor: Accessor;
    stateListenerUnsubscribe: Function;
    translations: Record<string, any>;
    unmounted: boolean;
    static contextTypes: React.ValidationMap<any>;
    static translationsPropType: (translations: any) => PropTypes.Requireable<PropTypes.InferProps<any>>;
    static propTypes: any;
    constructor(props?: any);
    defineBEMBlocks(): any;
    defineAccessor(): Accessor;
    translate(key: any, interpolations?: any): any;
    get bemBlocks(): any;
    get searchkit(): SearchkitManager;
    set searchkit(value: SearchkitManager);
    _getSearchkit(): SearchkitManager;
    componentDidMount(): void;
    _initAccessor(): boolean;
    componentWillUnmount(): void;
    getResults(): any;
    getHits(): any;
    getHitsCount(): any;
    hasHits(): boolean;
    hasHitsChanged(): any;
    getQuery(): ImmutableQuery;
    isInitialLoading(): boolean;
    isLoading(): boolean;
    getError(): any;
}
